import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Invoice.name,
        schema: InvoiceSchema,
      },
    ]),
    UserModule,
    ProductModule,
  ],
  controllers: [InvoiceController],
  providers: [
    CreateInvoiceUseCase,
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
  ],
  exports: [MongooseModule],
})
export class InvoiceModule {}
