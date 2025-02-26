import { InvoiceEntity } from './invoice.entity';
import { TransactionStrategy } from './transaction.interface';

export abstract class InvoiceEntityRepository {
  abstract findById(id: string): Promise<InvoiceEntity | null>;
  abstract create(
    invoice: Partial<InvoiceEntity>,
    transaction?: TransactionStrategy,
  ): Promise<InvoiceEntity | null>;
  abstract getUserPurchasesInLastMonth(userId: string): Promise<number>;
  abstract findByUserId(userId: string): Promise<InvoiceEntity[]>;
}
