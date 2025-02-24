import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './repositories/product.db';
import { ProductController } from './product.controller';
import { FindAllProductUseCase } from '../application/find-all-products.usecase';
import { FindProductByIdUseCase } from '../application/find-product-by-id.usecase';
import { MongooseProductRepository } from './repositories/mongoose.product-repository';
import { ProductEntityRepository } from '../domain/product.repository.interface';
import { CreateProductUseCase } from '../application/create-product.usecase';
import { UpdateProductUseCase } from '../application/update-product.usecase';
import { UserModule } from '@src/contexts/users/user.module';
import { JwtTokenService } from '@src/shared/infrastructure/jwt-token-service';
import { TokenService } from '@src/shared/domain/token-service.interface';
import { InvoiceModule } from '@src/contexts/invoice/infrastructure/invoice.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    UserModule,
    forwardRef(() => InvoiceModule),
  ],
  controllers: [ProductController],
  providers: [
    FindAllProductUseCase,
    FindProductByIdUseCase,
    CreateProductUseCase,
    UpdateProductUseCase,
    MongooseProductRepository,
    {
      provide: ProductEntityRepository,
      useExisting: MongooseProductRepository,
    },
    JwtTokenService,
    {
      provide: TokenService,
      useExisting: JwtTokenService,
    },
  ],
  exports: [
    MongooseModule,
    MongooseProductRepository,
    {
      provide: ProductEntityRepository,
      useExisting: MongooseProductRepository,
    },
  ],
})
export class ProductModule {}
