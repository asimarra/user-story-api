import { UserEntityRepository } from '@src/contexts/users/domain/user.repository.interface';
import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { LoginRequest, LoginResponse } from '../domain/login.dto';
import { TokenService } from '@src/shared/domain/token-service.interface';
import * as bcrypt from 'bcrypt';
import { UserStatus } from '@src/contexts/users/domain/user.entity';

@MyInjectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserEntityRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(params: LoginRequest): Promise<LoginResponse> {
    const { email, password } = params;

    const userData = await this.userRepository.findByEmail(email);

    if (userData?.status !== UserStatus.ACTIVE) {
      return {
        error: true,
        data: {
          message: 'User is not active',
        },
      };
    }

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

    const token = this.tokenService.generate({
      userId: userData.id,
    });

    return {
      error: false,
      data: {
        id: userData.id,
        name: userData.name,
        email: email,
        role: userData.role,
        token,
      },
    };
  }
}
