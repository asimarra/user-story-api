import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class InvoiceProductItemDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ required: true })
  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(0, { message: 'Quantity must be greater than 0' })
  quantity: number;
}

export class CreateInvoiceHttpDto {
  @ApiProperty({ type: [InvoiceProductItemDto], required: true })
  @ArrayNotEmpty()
  @Type(() => InvoiceProductItemDto)
  @ValidateNested({ each: true })
  products: InvoiceProductItemDto[];
}
