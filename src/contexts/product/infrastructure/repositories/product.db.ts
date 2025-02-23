import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductStatus } from '../../domain/product.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: Number, min: 0 })
  stock: number;

  @Prop({ default: ProductStatus.ACTIVE })
  status: ProductStatus;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
