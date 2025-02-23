import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { UserEntityRepository } from '../domain/user.repository.interface';
import { UserEntity } from '../domain/user.entity';
import { CreateUserResponse } from '../domain/create-user.dto';
import * as bcrypt from 'bcrypt';

@MyInjectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserEntityRepository) {}

  async execute(user: UserEntity): Promise<CreateUserResponse> {
    const { name, email, password, status, role } = user;

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
      new UserEntity('', name, email, hashedPassword, status, role),
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
      },
    };
  }
}
