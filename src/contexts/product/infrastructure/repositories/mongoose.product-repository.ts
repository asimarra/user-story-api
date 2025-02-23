import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { ProductEntityRepository } from '../../domain/product.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.db';
import { Model } from 'mongoose';
import { ProductEntity } from '../../domain/product.entity';

@MyInjectable()
export class MongooseProductRepository extends ProductEntityRepository {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {
    super();
  }

  async findAll(limit: number, offset: number): Promise<ProductEntity[]> {
    const products = await this.productModel.find().skip(offset).limit(limit);

    return products.map(
      (product) =>
        new ProductEntity(
          product._id as string,
          product.name,
          product.description,
          product.price,
          product.stock,
          product.status,
        ),
    );
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await this.productModel.findById(id);

    if (!product) return null;

    return new ProductEntity(
      product._id as string,
      product.name,
      product.description,
      product.price,
      product.stock,
      product.status,
    );
  }

  async create(product: Partial<Product>): Promise<ProductEntity> {
    const savedProduct = await new this.productModel(product).save();

    return new ProductEntity(
      savedProduct._id as string,
      savedProduct.name,
      savedProduct.description,
      savedProduct.price,
      savedProduct.stock,
      savedProduct.status,
    );
  }

  async update(
    id: string,
    product: Partial<Product>,
  ): Promise<ProductEntity | null> {
    return this.productModel.findByIdAndUpdate(id, product, { new: true });
  }
}
