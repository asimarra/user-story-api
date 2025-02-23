import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { ProductEntityRepository } from '../domain/product.repository.interface';
import { ProductEntity } from '../domain/product.entity';

@MyInjectable()
export class FindAllProductUseCase {
  constructor(private readonly productRepository: ProductEntityRepository) {}

  async execute(limit: number, offset: number): Promise<ProductEntity[]> {
    return this.productRepository.findAll(limit, offset);
  }
}
