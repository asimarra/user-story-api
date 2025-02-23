import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FindUserByEmailUseCase } from './application/find-user-by-email.usecase';
import { FindUserByEmailHttpDto } from './infrastructure/dto/find-user-by-email.http.dto';
import { FindAllUserUseCase } from './application/find-all-users.usecase';
import { FindAllHttpDto } from './infrastructure/dto/find-all.http.dto';
import { findAllResponse } from './domain/user.repository.interface';
import { PrimitiveUser } from './domain/user.entity';
import errors from '@src/config/errors.config';
import { AuthGuard } from '@src/shared/infrastructure/guards/auth.guard';
import { Permissions } from '@src/shared/infrastructure/decorators/permissions.decorator';
import { Resource } from '@src/shared/domain/resources.enum';
import { Action } from '@src/shared/domain/action.enum';
import { AuthorizationGuard } from '@src/shared/infrastructure/guards/authorization.guard';

@UseGuards(AuthGuard, AuthorizationGuard)
@Permissions([{ resource: Resource.USERS, actions: [Action.READ] }])
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
