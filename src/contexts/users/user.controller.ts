import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Query,
  Req,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { FindUserByEmailUseCase } from './application/find-user-by-email.usecase';
import { FindUserByEmailHttpDto } from './infrastructure/dto/find-user-by-email.http.dto';
import { FindAllUserUseCase } from './application/find-all-users.usecase';
import {
  FindAllHttpDto,
  FindAllHttpResponseDto,
} from './infrastructure/dto/find-all.http.dto';
import { findAllResponse } from './domain/user.repository.interface';
import { PrimitiveUser, UserEntity, UserStatus } from './domain/user.entity';
import errors from '@src/config/errors.config';
import { AuthGuard } from '@src/shared/infrastructure/guards/auth.guard';
import { Permissions } from '@src/shared/infrastructure/decorators/permissions.decorator';
import { Resource } from '@src/shared/domain/resources.enum';
import { Action } from '@src/shared/domain/action.enum';
import { AuthorizationGuard } from '@src/shared/infrastructure/guards/authorization.guard';
import { Body, Post } from '@nestjs/common';
import { CreateUserHttpDto } from './infrastructure/dto/create-user.http.dto';
import { CreateUserUseCase } from './application/create-user.usecase';
import { CreateUserResponse } from './domain/create-user.dto';
import { UpdateUserHttpDto } from './infrastructure/dto/update-user.http.dto';
import { UpdateUserResponse } from './domain/update-user.dto';
import { UpdateUserUseCase } from './application/update-user.usecase';
import { DeleteUserResponse } from './domain/delete-user.dto';
import { DeleteUserUseCase } from './application/delete-user.usecase';
import { ApiResponse } from '@nestjs/swagger';
import { UpdateProfileUserUseCase } from './application/update-profile-user.usecase';
import { UpdateProfileUserHttpDto } from './infrastructure/dto/update-profile-user.http.dto';

@UseGuards(AuthGuard, AuthorizationGuard)
@Permissions([{ resource: Resource.USERS, actions: [Action.READ] }])
@Controller('users')
export class UserController {
  constructor(
    @Inject() private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    @Inject() private readonly findAllUserUseCase: FindAllUserUseCase,
    @Inject() private readonly createUserUseCase: CreateUserUseCase,
    @Inject() private readonly updateUserUseCase: UpdateUserUseCase,
    @Inject() private readonly deleteUserUseCase: DeleteUserUseCase,
    @Inject()
    private readonly updateProfileUserUseCase: UpdateProfileUserUseCase,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all users',
    type: [FindAllHttpResponseDto],
  })
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

  @Permissions([{ resource: Resource.USERS, actions: [Action.CREATE] }])
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserHttpDto,
  ): Promise<CreateUserResponse | NotFoundException> {
    const { name, email, password, status, role } = createUserDto;

    const createUserResponse = await this.createUserUseCase.execute(
      new UserEntity('', name, email, password, status, role),
    );

    if (createUserResponse.error) {
      throw new UnprocessableEntityException(createUserResponse.data);
    }

    return createUserResponse;
  }

  @Permissions([{ resource: Resource.USERS, actions: [Action.UPDATE] }])
  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body()
    updateUserDto: UpdateUserHttpDto,
  ): Promise<UpdateUserResponse | NotFoundException> {
    const { name, email, password, status, role } = updateUserDto;

    const updateUserResponse = await this.updateUserUseCase.execute(
      new UserEntity(userId, name, email, password, status, role),
    );

    if (updateUserResponse.error) {
      throw new UnprocessableEntityException(updateUserResponse.data);
    }

    return updateUserResponse;
  }

  @Permissions([{ resource: Resource.USERS, actions: [Action.UPDATE_PROFILE] }])
  @Patch(':userId/profile')
  async updateProfileUser(
    @Req() req: { userId: string },
    @Param('userId') userId: string,
    @Body()
    updateUserDto: UpdateProfileUserHttpDto,
  ): Promise<UpdateUserResponse | NotFoundException> {
    const { name, email, password } = updateUserDto;

    const updateUserResponse = await this.updateProfileUserUseCase.execute(
      {
        id: userId,
        name,
        email,
        password,
      },
      req.userId,
    );

    if (updateUserResponse.error) {
      throw new UnprocessableEntityException(updateUserResponse.data);
    }

    return updateUserResponse;
  }

  @Permissions([{ resource: Resource.USERS, actions: [Action.DELETE] }])
  @Delete(':userId')
  async deleteUser(
    @Param('userId') userId: string,
  ): Promise<DeleteUserResponse | NotFoundException> {
    const deleteUserResponse = await this.deleteUserUseCase.execute(
      userId,
      UserStatus.DELETED,
    );

    if (deleteUserResponse.error) {
      throw new UnprocessableEntityException(deleteUserResponse.data);
    }

    return deleteUserResponse;
  }
}
