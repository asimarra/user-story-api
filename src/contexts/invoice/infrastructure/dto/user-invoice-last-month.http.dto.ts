import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserInvoiceLastMonthHttpDto {
  @ApiProperty({ required: true })
  @IsString()
  userId: string;
}
