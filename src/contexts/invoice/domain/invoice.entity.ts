import { ProductEntity } from '@src/contexts/product/domain/product.entity';
import { UserEntity } from '@src/contexts/users/domain/user.entity';

// invoice-status.enum.ts
export enum InvoiceStatus {
  PROCESSED = 'PROCESSED',
  CANCELLED = 'CANCELLED',
}

export interface ProductPurchaseEntity {
  product: ProductEntity;
  quantity: number;
}

export interface PrimitiveInvoice {
  id: string;
  user: UserEntity;
  products: ProductPurchaseEntity[];
  total: number;
  status: InvoiceStatus;
  createdAt?: Date;
}

export class InvoiceEntity {
  constructor(
    public id: string,
    public user: UserEntity,
    public products: ProductPurchaseEntity[],
    public total: number,
    public status: InvoiceStatus,
    public createdAt?: Date,
  ) {}

  toPrimitive(): PrimitiveInvoice {
    return {
      id: this.id,
      user: this.user,
      products: this.products,
      total: this.total,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}
