import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { ProductEntityRepository } from '../domain/product.repository.interface';
import { ProductEntity } from '../domain/product.entity';

@MyInjectable()
export class FindProductByIdUseCase {
  constructor(private readonly productRepository: ProductEntityRepository) {}

  async execute(id: string): Promise<ProductEntity | null> {
    const product = await this.productRepository.findById(id);

    if (!product) return null;

    return product;
  }
}
