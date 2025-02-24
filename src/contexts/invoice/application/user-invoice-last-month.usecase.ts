import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { InvoiceEntityRepository } from '../domain/invoice.repository.interface';

@MyInjectable()
export class UserInvoiceLastMonthUseCase {
  constructor(private readonly invoiceRepository: InvoiceEntityRepository) {}

  async execute(id: string): Promise<{ noPurchases: number }> {
    const userPurchasesLastMonthCount =
      await this.invoiceRepository.getUserPurchasesInLastMonth(id);
    return { noPurchases: userPurchasesLastMonthCount || 0 };
  }
}
