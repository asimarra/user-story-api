import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { UserEntityRepository } from '../domain/user.repository.interface';
import { UserEntity } from '../domain/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserResponse } from '../domain/update-user.dto';

@MyInjectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserEntityRepository) {}

  async execute(user: UserEntity): Promise<UpdateUserResponse> {
    const { id, name, email, password, status, role } = user;

    const existUserId = await this.userRepository.findById(id);
    if (!existUserId) {
      return {
        error: true,
        data: {
          message: 'User Id does not exist',
        },
      };
    }

    const emailInUse = await this.userRepository.findByEmail(email);
    if (emailInUse && emailInUse?.id.toString() !== id) {
      return {
        error: true,
        data: {
          message: 'Email already in use',
        },
      };
    }

    let hashedPassword = existUserId.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const userId = await this.userRepository.update(
      new UserEntity(id, name, email, hashedPassword, status, role),
    );

    if (!userId) {
      return {
        error: true,
        data: {
          message: 'Error updating the user',
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
