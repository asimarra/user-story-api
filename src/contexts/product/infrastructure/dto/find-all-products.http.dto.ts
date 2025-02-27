import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ProductStatus } from '../../domain/product.entity';

export class FindAllProductsHttpDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  limit: string = '10';

  @ApiProperty({ required: false })
  @IsString()
  offset?: string = '0';
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
