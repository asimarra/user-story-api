import { Module, forwardRef } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, InvoiceSchema } from './repositories/invoice.db';
import { UserModule } from '@src/contexts/users/user.module';
import { ProductModule } from '@src/contexts/product/infrastructure/product.module';
import { CreateInvoiceUseCase } from '../application/create-invoice.usecase';
import { MongooseInvoiceRepository } from './repositories/mongoose.invoice-repository';
import { InvoiceEntityRepository } from '../domain/invoice.repository.interface';
import { JwtTokenService } from '@src/shared/infrastructure/jwt-token-service';
import { TokenService } from '@src/shared/domain/token-service.interface';
import { MongooseTransaction } from './repositories/mongoose.transaction';
import { TransactionStrategy } from '../domain/transaction.interface';
import { FindInvoiceByIdUseCase } from '../application/find-invoice-by-id.usecase';
import { UserInvoiceLastMonthUseCase } from '../application/user-invoice-last-month.usecase';
import { FindInvoicesByUserIdUseCase } from '../application/find-all-invoices-by-user-id.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Invoice.name,
        schema: InvoiceSchema,
      },
    ]),
    UserModule,
    forwardRef(() => ProductModule),
  ],
  controllers: [InvoiceController],
  providers: [
    CreateInvoiceUseCase,
    FindInvoiceByIdUseCase,
    UserInvoiceLastMonthUseCase,
    FindInvoicesByUserIdUseCase,
    MongooseInvoiceRepository,
    {
      provide: InvoiceEntityRepository,
      useExisting: MongooseInvoiceRepository,
    },
    JwtTokenService,
    {
      provide: TokenService,
      useExisting: JwtTokenService,
    },
    MongooseTransaction,
    {
      provide: TransactionStrategy,
      useExisting: MongooseTransaction,
    },
  ],
  exports: [
    MongooseModule,
    MongooseInvoiceRepository,
    {
      provide: InvoiceEntityRepository,
      useExisting: MongooseInvoiceRepository,
    },
    MongooseTransaction,
    {
      provide: TransactionStrategy,
      useExisting: MongooseTransaction,
    },
  ],
})
export class InvoiceModule {}
