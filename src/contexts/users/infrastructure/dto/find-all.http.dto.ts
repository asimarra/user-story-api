import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UserStatus } from '../../domain/user.entity';
import { Roles } from '@src/shared/domain/roles.enum';

export class FindAllHttpDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  limit: string = '10';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  offset?: string = '0';
}

export class FindAllHttpResponseDto {
  @ApiProperty({ required: false })
  id: string;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  email: string;
  @ApiProperty({ required: false })
  status: UserStatus;
  @ApiProperty({ required: false })
  role: Roles;
  @ApiProperty({ required: false })
  createdAt: Date;
  @ApiProperty({ required: false })
  updatedAt: Date;
}
