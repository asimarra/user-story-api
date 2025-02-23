import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { ProductEntityRepository } from '../domain/product.repository.interface';
import { ProductEntity } from '../domain/product.entity';

export interface CreateProductResponse {
  error: boolean;
  data:
    | { message: string }
    | {
        productId: string;
      };
}

@MyInjectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductEntityRepository) {}

  async execute(
    productData: Partial<ProductEntity>,
  ): Promise<CreateProductResponse> {
    if (productData.stock && productData.stock < 0) {
      return {
        error: true,
        data: { message: 'Stock cannot be negative' },
      };
    }

    const createdProduct = await this.productRepository.create(productData);

    return {
      error: false,
      data: { productId: createdProduct.id },
    };
  }
}
