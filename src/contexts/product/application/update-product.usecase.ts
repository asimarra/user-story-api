import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { ProductEntityRepository } from '../domain/product.repository.interface';
import { ProductEntity } from '../domain/product.entity';

export interface UpdateProductResponse {
  error: boolean;
  data:
    | { message: string }
    | {
        productId: string;
      };
}

@MyInjectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductEntityRepository) {}

  async execute(
    id: string,
    productData: Partial<ProductEntity>,
  ): Promise<UpdateProductResponse> {
    const updatedProduct = await this.productRepository.update(id, productData);

    if (!updatedProduct) {
      return {
        error: true,
        data: { message: 'Product not found' },
      };
    }

    return {
      error: false,
      data: { productId: updatedProduct.id },
    };
  }
}
