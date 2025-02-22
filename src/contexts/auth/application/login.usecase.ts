import { UserEntityRepository } from '@src/contexts/users/domain/user.repository.interface';
import { MyInjectable } from '@src/shared/dependency-injection/my-injectable';
import { LoginRequest, LoginResponse } from '../domain/login.dto';
import { TokenService } from '@src/shared/domain/token-service.interface';
import * as bcrypt from 'bcrypt';

@MyInjectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserEntityRepository,
    private readonly tokenService: TokenService,
  ) {}

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

    const token = await this.tokenService.generate({
      userId: userData.id,
    });

    return {
      error: false,
      data: {
        name: userData.name,
        email: email,
        role: userData.role,
        token,
      },
    };
  }
}
