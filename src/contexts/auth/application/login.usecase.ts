import { UserEntityRepository } from '@src/contexts/users/domain/user.repository.interface';
import { MyInjectable } from '@src/shared/dependency-injection/my-injectable';
import { LoginRequest, LoginResponse } from '../domain/login.dto';
import * as bcrypt from 'bcrypt';

@MyInjectable()
export class LoginUseCase {
  constructor(private readonly userRepository: UserEntityRepository) {}

  async execute(params: LoginRequest): Promise<LoginResponse> {
    const { email, password } = params;

    const userData = await this.userRepository.findByEmail(email);
    if (!userData) {
      return {
        error: true,
        data: {
          message: 'Email does not exist',
        },
      };
    }

    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      return {
        error: true,
        data: {
          message: 'Wrong credentials',
        },
      };
    }

    return {
      error: false,
      data: {
        userId: userData.id,
        name: userData.name,
        email: email,
        role: userData.role,
        token: 'fake-jwt-token',
      },
    };
  }
}
