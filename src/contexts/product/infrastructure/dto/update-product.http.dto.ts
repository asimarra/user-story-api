import { IsString, IsNumber, IsEnum, Min, IsOptional } from 'class-validator';
import { ProductStatus } from '../../domain/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductHttpDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'Price must be greater than 0' })
  price: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'Stock must be greater than 0' })
  stock: number;

  @ApiProperty({ required: false })
  @IsEnum(ProductStatus)
  @IsOptional()
  status: ProductStatus;
}
