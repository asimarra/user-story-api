export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  DISCONTINUED = 'DISCONTINUED',
  DELETED = 'DELETED',
}

export interface PrimitiveProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: ProductStatus;
}

export class ProductEntity {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public status: ProductStatus,
  ) {}

  toPrimitive(): any {
    return {
      id: this.id || '',
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      status: this.status,
    };
  }
}
