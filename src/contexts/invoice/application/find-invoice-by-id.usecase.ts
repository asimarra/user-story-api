import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { InvoiceEntityRepository } from '../domain/invoice.repository.interface';
import { InvoiceEntity } from '../domain/invoice.entity';

@MyInjectable()
export class FindInvoiceByIdUseCase {
  constructor(private readonly invoiceRepository: InvoiceEntityRepository) {}

  async execute(id: string): Promise<InvoiceEntity | null> {
    const invoice = await this.invoiceRepository.findById(id);

    if (!invoice) return null;

    return invoice;
  }
}
