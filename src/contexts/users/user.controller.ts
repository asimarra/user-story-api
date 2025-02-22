import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { FindUserByEmailUseCase } from './application/find-user-by-email.usecase';
import { FindUserByEmailHttpDto } from './infrastructure/dto/find-user-by-email.http.dto';
import { FindAllUserUseCase } from './application/find-all-users.usecase';
import { FindAllHttpDto } from './infrastructure/dto/find-all.http.dto';
import { findAllResponse } from './domain/user.repository.interface';
import { PrimitiveUser } from './domain/user.entity';
import errors from '@src/config/errors.config';

@Controller('users')
export class UserController {
  constructor(
    @Inject() private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    @Inject() private readonly findAllUserUseCase: FindAllUserUseCase,
  ) {}

  @Get()
  findAll(@Query() query: FindAllHttpDto): Promise<findAllResponse[] | null> {
    const { limit = 10, offset = 0 } = query;
    return this.findAllUserUseCase.execute(+limit, +offset);
  }

  @Get(':email')
  async findUserByEmail(
    @Param() param: FindUserByEmailHttpDto,
  ): Promise<PrimitiveUser | NotFoundException> {
    const user = await this.findUserByEmailUseCase.execute(param.email);

    if (!user) {
      throw new NotFoundException(errors.notFound);
    }

    return user;
  }
}
