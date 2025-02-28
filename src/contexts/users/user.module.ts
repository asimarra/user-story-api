import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/repositories/user.db';
import { UserController } from './user.controller';
import { FindUserByEmailUseCase } from './application/find-user-by-email.usecase';
import { UserEntityRepository } from './domain/user.repository.interface';
import { MongooseUserRepository } from './infrastructure/repositories/mongoose.user-repository';
import { FindAllUserUseCase } from './application/find-all-users.usecase';
import { JwtTokenService } from '@src/shared/infrastructure/jwt-token-service';
import { TokenService } from '@src/shared/domain/token-service.interface';
import { CreateUserUseCase } from './application/create-user.usecase';
import { UpdateUserUseCase } from './application/update-user.usecase';
import { DeleteUserUseCase } from './application/delete-user.usecase';
import { UpdateProfileUserUseCase } from './application/update-profile-user.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    FindUserByEmailUseCase,
    FindAllUserUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    UpdateProfileUserUseCase,
    MongooseUserRepository,
    {
      provide: UserEntityRepository,
      useExisting: MongooseUserRepository,
    },
    JwtTokenService,
    {
      provide: TokenService,
      useExisting: JwtTokenService,
    },
  ],
  exports: [
    MongooseModule,
    MongooseUserRepository,
    {
      provide: UserEntityRepository,
      useExisting: MongooseUserRepository,
    },
  ],
})
export class UserModule {}
