import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindInvoicesByUserIdHttpDto {
  @ApiProperty({ required: true })
  @IsString()
  userId: string;
}
