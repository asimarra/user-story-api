import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/repositories/user.db';
import { UserController } from './user.controller';
import { FindUserByEmailUseCase } from './application/find-user-by-email.usecase';
import { UserEntityRepository } from './domain/user.repository.interface';
import { MongooseUserRepository } from './infrastructure/repositories/mongoose.user-repository';
import { FindAllUserUseCase } from './application/find-all-users.usecase';

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
    MongooseUserRepository,
    {
      provide: UserEntityRepository,
      useExisting: MongooseUserRepository,
    },
  ],
  exports: [MongooseModule],
})
export class UserModule {}
