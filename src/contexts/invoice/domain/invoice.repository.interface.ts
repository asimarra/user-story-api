import { InvoiceEntity } from './invoice.entity';

export abstract class InvoiceEntityRepository {
  abstract findById(id: string): Promise<InvoiceEntity | null>;
  abstract create(
    invoice: Partial<InvoiceEntity>,
  ): Promise<InvoiceEntity | null>;
}
