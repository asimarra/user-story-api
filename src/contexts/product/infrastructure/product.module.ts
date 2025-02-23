import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './repositories/product.db';
import { ProductController } from './product.controller';
import { FindAllProductUseCase } from '../application/find-all-products.usecase';
import { FindProductByIdUseCase } from '../application/find-product-by-id.usecase';
import { MongooseProductRepository } from './repositories/mongoose.product-repository';
import { ProductEntityRepository } from '../domain/product.repository.interface';
import { CreateProductUseCase } from '../application/create-product.usecase';
import { UpdateProductUseCase } from '../application/update-product.usecase';

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
    FindProductByIdUseCase,
    CreateProductUseCase,
    UpdateProductUseCase,
    MongooseProductRepository,
    {
      provide: ProductEntityRepository,
      useExisting: MongooseProductRepository,
    },
  ],
  exports: [MongooseModule],
})
export class ProductModule {}
