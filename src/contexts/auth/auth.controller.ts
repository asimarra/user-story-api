import {
  Body,
  Controller,
  Inject,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SignUpUseCase } from './application/signup.usecase';
import { SignUpHttpDto } from './infrastructure/dto/signup.http.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject() private readonly singUpUseCase: SignUpUseCase) {}

  @Post('signup')
  async singUp(@Body() data: SignUpHttpDto) {
    const singUpResponse = await this.singUpUseCase.execute(data);

    if (singUpResponse.error) {
      throw new UnprocessableEntityException(singUpResponse.data);
    }

    return singUpResponse.data;
  }
}
