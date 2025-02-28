import { TransactionStrategy } from '@src/contexts/invoice/domain/transaction.interface';
import { ProductEntity } from './product.entity';

export abstract class ProductEntityRepository {
  abstract findAll(limit?: number, offset?: number): Promise<ProductEntity[]>;
  abstract findById(id: string): Promise<ProductEntity | null>;
  abstract create(productData: Partial<ProductEntity>): Promise<ProductEntity>;
  abstract update(
    id: string,
    productData: Partial<ProductEntity>,
  ): Promise<ProductEntity | null>;

  abstract updateStock(
    productId: string,
    newStock: number,
    transaction?: TransactionStrategy,
  ): Promise<boolean>;
}
