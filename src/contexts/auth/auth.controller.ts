import {
  Body,
  Controller,
  Inject,
  Post,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SignUpUseCase } from './application/signup.usecase';
import { SignUpHttpDto } from './infrastructure/dto/signup.http.dto';
import { LoginHttpDto } from './infrastructure/dto/login.http.dto';
import { LoginUseCase } from './application/login.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject() private readonly singUpUseCase: SignUpUseCase,
    @Inject() private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('signup')
  async singUp(@Body() data: SignUpHttpDto) {
    const singUpResponse = await this.singUpUseCase.execute(data);

    if (singUpResponse.error) {
      throw new UnprocessableEntityException(singUpResponse.data);
    }

    return singUpResponse.data;
  }

  @Post('login')
  async login(@Body() data: LoginHttpDto) {
    const loginResponse = await this.loginUseCase.execute(data);

    if (loginResponse.error) {
      throw new UnauthorizedException(loginResponse.data);
    }

    return loginResponse.data;
  }
}
