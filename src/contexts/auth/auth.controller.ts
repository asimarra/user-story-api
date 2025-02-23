import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SignUpUseCase } from './application/signup.usecase';
import {
  SignUpErrorResponseHttpDto,
  SignUpHttpDto,
  SignUpSuccessResponseHttpDto,
} from './infrastructure/dto/signup.http.dto';
import {
  LoginErrorResponseHttpDto,
  LoginHttpDto,
  LoginSuccessResponseHttpDto,
} from './infrastructure/dto/login.http.dto';
import { LoginUseCase } from './application/login.usecase';
import { ApiOkResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject() private readonly singUpUseCase: SignUpUseCase,
    @Inject() private readonly loginUseCase: LoginUseCase,
  ) {}

  @ApiOkResponse({
    type: SignUpSuccessResponseHttpDto,
  })
  @ApiUnprocessableEntityResponse({
    type: SignUpErrorResponseHttpDto,
  })
  @Post('signup')
  async singUp(@Body() data: SignUpHttpDto) {
    const singUpResponse = await this.singUpUseCase.execute(data);

    if (singUpResponse.error) {
      throw new UnprocessableEntityException(singUpResponse.data);
    }

    return singUpResponse.data;
  }

  @ApiOkResponse({
    type: LoginSuccessResponseHttpDto,
  })
  @ApiUnprocessableEntityResponse({
    type: LoginErrorResponseHttpDto,
  })
  @Post('login')
  async login(@Body() data: LoginHttpDto) {
    const loginResponse = await this.loginUseCase.execute(data);

    if (loginResponse.error) {
      throw new UnauthorizedException(loginResponse.data);
    }

    return loginResponse.data;
  }
}
