import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { InvoiceEntityRepository } from '../domain/invoice.repository.interface';
import { InvoiceEntity } from '../domain/invoice.entity';

@MyInjectable()
export class FindAllInvoicesUseCase {
  constructor(private readonly invoiceRepository: InvoiceEntityRepository) {}

  async execute(): Promise<InvoiceEntity[] | []> {
    const invoices = await this.invoiceRepository.find();

    if (!invoices) return [];

    return invoices;
  }
}
