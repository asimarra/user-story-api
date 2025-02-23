// invoice.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { InvoiceStatus } from '../../domain/invoice.entity';
import { Product } from '@src/contexts/product/infrastructure/repositories/product.db';
import { User } from '@src/contexts/users/infrastructure/repositories/user.db';

@Schema()
export class Invoice extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({
    type: [
      {
        product: { type: MongooseSchema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
      },
    ],
    required: true,
  })
  products: { product: Product; quantity: number }[];

  @Prop({ required: true, type: Number })
  total: number;

  @Prop({
    type: String,
    enum: InvoiceStatus,
    default: InvoiceStatus.PROCESSED,
  })
  status: InvoiceStatus;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
