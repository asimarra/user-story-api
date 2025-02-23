import { IsString, IsNumber, IsEnum, IsNotEmpty, Min } from 'class-validator';
import { ProductStatus } from '../../domain/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductHttpDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @Min(0, { message: 'Price must be greater than 0' })
  price: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @Min(0, { message: 'Stock must be greater than 0' })
  stock: number;

  @ApiProperty({ required: true })
  @IsEnum(ProductStatus)
  status: ProductStatus;
}
