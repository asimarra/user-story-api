import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { InvoiceEntityRepository } from '../domain/invoice.repository.interface';
import {
  InvoiceEntity,
  InvoiceStatus,
  ProductPurchaseEntity,
} from '../domain/invoice.entity';
import { ProductEntityRepository } from '@src/contexts/product/domain/product.repository.interface';
import {
  ProductEntity,
  ProductStatus,
} from '@src/contexts/product/domain/product.entity';
import { UserEntityRepository } from '@src/contexts/users/domain/user.repository.interface';
import { UserEntity, UserStatus } from '@src/contexts/users/domain/user.entity';

export interface CreateInvoiceResponse {
  error: boolean;
  data: { message: string } | InvoiceEntity;
}

@MyInjectable()
export class CreateInvoiceUseCase {
  constructor(
    private readonly invoiceRepository: InvoiceEntityRepository,
    private readonly productRepository: ProductEntityRepository,
    private readonly userRepository: UserEntityRepository,
  ) {}

  async execute(
    userId: string,
    productPurchases: { productId: string; quantity: number }[],
  ): Promise<CreateInvoiceResponse> {
    let total = 0;

    const userData = await this.userRepository.findById(userId);
    if (!userData || userData.status !== UserStatus.ACTIVE) {
      return {
        error: true,
        data: { message: 'User does not exist' },
      };
    }

    const productsPurchase: ProductPurchaseEntity[] = [];
    for (const purchase of productPurchases) {
      const product = await this.productRepository.findById(purchase.productId);

      if (!product || product.status !== ProductStatus.ACTIVE) {
        return {
          error: true,
          data: { message: 'Product does not exist' },
        };
      }

      if (product.stock < purchase.quantity) {
        return {
          error: true,
          data: { message: `Insufficient stock for product ${product.name}` },
        };
      }

      const newProduct = new ProductEntity(
        purchase.productId,
        product.name,
        product.description,
        product.price,
        product.stock - purchase.quantity,
        product.status,
      );

      await this.productRepository.update(purchase.productId, newProduct);

      productsPurchase.push({
        product: newProduct,
        quantity: purchase.quantity,
      });

      total += product.price * purchase.quantity;
    }

    const newInvoice = new InvoiceEntity(
      '',
      new UserEntity(
        userId,
        userData.name,
        userData.email,
        '',
        userData.status,
        userData.role,
      ),
      productsPurchase,
      total,
      InvoiceStatus.PROCESSED,
      new Date(),
    );

    const createdInvoice = await this.invoiceRepository.create(newInvoice);

    if (!createdInvoice) {
      return {
        error: true,
        data: { message: 'Failed to create invoice' },
      };
    }

    return {
      error: false,
      data: createdInvoice,
    };
  }
}
