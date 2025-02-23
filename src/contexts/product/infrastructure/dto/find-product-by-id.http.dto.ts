import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '../../domain/product.entity';
import { IsString } from 'class-validator';

export class FindProductByIdHttpDto {
  @ApiProperty({ required: true })
  @IsString()
  productId: string;
}

export class FindProductByIdHttpResponseDto {
  @ApiProperty({ required: false })
  id: string;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  description: string;
  @ApiProperty({ required: false })
  price: number;
  @ApiProperty({ required: false })
  stock: number;
  @ApiProperty({ required: false })
  status: ProductStatus;
}
