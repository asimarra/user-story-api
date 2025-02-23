import { Roles } from '@src/shared/domain/roles.enum';
import { UserStatus } from '../../domain/user.entity';
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserHttpDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])(?=.*[A-Z])/, {
    message:
      'Password must contain at least one number and one uppercase letter',
  })
  password: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  @MinLength(6)
  @IsIn([Math.random()], {
    message: 'Passwords do not match',
  })
  @ValidateIf((o: UpdateUserHttpDto) => o.password !== o.repeatPassword)
  repeatPassword: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  @IsEnum(UserStatus)
  status: UserStatus;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  @IsEnum(Roles)
  role: Roles;
}
