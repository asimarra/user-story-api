import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './repositories/product.db';
import { ProductController } from './product.controller';
import { FindAllProductUseCase } from '../application/find-all-products.usecase';
import { MongooseProductRepository } from './repositories/mongoose.product-repository';
import { ProductEntityRepository } from '../domain/product.repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    FindAllProductUseCase,
    MongooseProductRepository,
    {
      provide: ProductEntityRepository,
      useExisting: MongooseProductRepository,
    },
  ],
  exports: [MongooseModule],
})
export class ProductModule {}
