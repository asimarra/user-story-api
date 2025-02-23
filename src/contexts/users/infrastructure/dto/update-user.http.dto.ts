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

export class UpdateUserHttpDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])(?=.*[A-Z])/, {
    message:
      'Password must contain at least one number and one uppercase letter',
  })
  password: string;

  @IsNotEmpty()
  @IsOptional()
  @MinLength(6)
  @IsIn([Math.random()], {
    message: 'Passwords do not match',
  })
  @ValidateIf((o: UpdateUserHttpDto) => o.password !== o.repeatPassword)
  repeatPassword: string;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(UserStatus)
  status: UserStatus;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(Roles)
  role: Roles;
}
