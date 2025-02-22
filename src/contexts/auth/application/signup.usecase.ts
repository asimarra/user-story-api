import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { UserEntityRepository } from '@src/contexts/users/domain/user.repository.interface';
import { SignUpRequest, SignUpResponse } from '../domain/signup.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity, UserStatus } from '@src/contexts/users/domain/user.entity';
import { Roles } from '@src/shared/domain/roles.entity';

@MyInjectable()
export class SignUpUseCase {
  constructor(private readonly userRepository: UserEntityRepository) {}

  async execute(params: SignUpRequest): Promise<SignUpResponse> {
    const { name, email, password } = params;

    const emailInUse = await this.userRepository.findByEmail(email);

    if (emailInUse) {
      return {
        error: true,
        data: {
          message: 'Email already in use',
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await this.userRepository.create(
      new UserEntity(
        '',
        name,
        email,
        hashedPassword,
        UserStatus.ACTIVE,
        Roles.USER,
      ),
    );

    if (!userId) {
      return {
        error: true,
        data: {
          message: 'Error inserting the user',
        },
      };
    }

    return {
      error: false,
      data: {
        userId,
        name,
        email,
        role: Roles.USER,
        token: 'fake-jwt-token',
      },
    };
  }
}
