import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SignUpUseCase } from './application/signup.usecase';
import { MongooseUserRepository } from '../users/infrastructure/repositories/mongoose.user-repository';
import { UserEntityRepository } from '../users/domain/user.repository.interface';

import { UserModule } from '../users/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    SignUpUseCase,
    MongooseUserRepository,
    {
      provide: UserEntityRepository,
      useExisting: MongooseUserRepository,
    },
  ],
})
export class AuthModule {}
