import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindInvoiceByIdHttpDto {
  @ApiProperty({ required: true })
  @IsString()
  invoiceId: string;
}
