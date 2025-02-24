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
import { TransactionStrategy } from '../domain/transaction.interface';

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
    private readonly transaction: TransactionStrategy,
  ) {}

  async execute(
    userId: string,
    productPurchases: { productId: string; quantity: number }[],
  ): Promise<CreateInvoiceResponse> {
    await this.transaction.start();

    try {
      const userData = await this.userRepository.findById(userId);
      if (!userData || userData.status !== UserStatus.ACTIVE) {
        await this.transaction.rollback();
        return {
          error: true,
          data: { message: 'User does not exist or is inactive' },
        };
      }

      let total = 0;
      const productsPurchase: ProductPurchaseEntity[] = [];

      for (const purchase of productPurchases) {
        const product = await this.productRepository.findById(
          purchase.productId,
        );

        if (!product || product.status !== ProductStatus.ACTIVE) {
          await this.transaction.rollback();
          return {
            error: true,
            data: { message: 'Product does not exist' },
          };
        }

        if (product.stock < purchase.quantity) {
          await this.transaction.rollback();
          return {
            error: true,
            data: {
              message: `Insufficient stock for product ${product.name}`,
            },
          };
        }

        productsPurchase.push({
          product: new ProductEntity(
            purchase.productId,
            product.name,
            product.description,
            product.price,
            product.stock - purchase.quantity,
            product.status,
          ),
          quantity: purchase.quantity,
        });

        total += product.price * purchase.quantity;
      }

      for (const item of productsPurchase) {
        await this.productRepository.updateStock(
          item.product.id,
          item.product.stock,
          this.transaction,
        );
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

      const createdInvoice = await this.invoiceRepository.create(
        newInvoice,
        this.transaction,
      );

      if (!createdInvoice) {
        await this.transaction.rollback();
        return {
          error: true,
          data: { message: 'Failed to create invoice' },
        };
      }

      await this.transaction.commit();

      return {
        error: false,
        data: createdInvoice,
      };
    } catch (error: unknown) {
      console.log(error);
      await this.transaction.rollback();

      if (error instanceof Error) {
        return { error: true, data: { message: error.message } };
      }

      return { error: true, data: { message: 'An unknown error occurred' } };
    }
  }
}
