import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ProductStatus } from '../../domain/product.entity';

export class FindAllProductsHttpDto {
  @ApiProperty({ required: false })
  @IsOptional()
  limit?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  offset?: string;
}

export class FindAllProductsHttpResponseDto {
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
