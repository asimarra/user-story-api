import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { InvoiceEntityRepository } from '../domain/invoice.repository.interface';
import { InvoiceEntity } from '../domain/invoice.entity';

@MyInjectable()
export class FindInvoicesByUserIdUseCase {
  constructor(private readonly invoiceRepository: InvoiceEntityRepository) {}

  async execute(userId: string): Promise<InvoiceEntity[] | []> {
    const invoices = await this.invoiceRepository.findByUserId(userId);

    if (!invoices) return [];

    return invoices;
  }
}
