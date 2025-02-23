import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileUserHttpDto {
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
  @ValidateIf((o: UpdateProfileUserHttpDto) => o.password !== o.repeatPassword)
  repeatPassword: string;
}
