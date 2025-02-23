import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { InvoiceEntityRepository } from '../../domain/invoice.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice } from './invoice.db';
import { Model } from 'mongoose';
import { InvoiceEntity } from '../../domain/invoice.entity';
import { UserEntity } from '@src/contexts/users/domain/user.entity';
import { ProductEntity } from '@src/contexts/product/domain/product.entity';

@MyInjectable()
export class MongooseInvoiceRepository extends InvoiceEntityRepository {
  constructor(@InjectModel(Invoice.name) private invoiceModel: Model<Invoice>) {
    super();
  }

  async findById(id: string): Promise<InvoiceEntity | null> {
    const invoice = await this.invoiceModel
      .findById(id)
      .populate('user')
      .populate('products.product');

    if (!invoice) {
      return null;
    }

    const products = invoice.products.map((p) => ({
      product: new ProductEntity(
        p.product._id as string,
        p.product.name,
        p.product.description,
        p.product.price,
        p.product.stock,
        p.product.status,
      ),
      quantity: p.quantity,
    }));

    return new InvoiceEntity(
      invoice._id as string,
      new UserEntity(
        invoice.user._id as string,
        invoice.user.name,
        invoice.user.email,
        '',
        invoice.user.status,
        invoice.user.role,
      ),
      products,
      invoice.total,
      invoice.status,
      invoice.createdAt,
    );
  }

  async create(invoice: InvoiceEntity): Promise<InvoiceEntity | null> {
    const createdInvoice = await new this.invoiceModel(invoice).save();

    if (!createdInvoice._id) {
      return null;
    }

    return this.findById(createdInvoice._id as string);
  }
}
