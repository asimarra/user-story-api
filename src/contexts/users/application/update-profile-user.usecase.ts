import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { UserEntityRepository } from '../domain/user.repository.interface';
import { PrimitiveUser, UserEntity } from '../domain/user.entity';
import { UpdateUserResponse } from '../domain/update-user.dto';
import * as bcrypt from 'bcrypt';

@MyInjectable()
export class UpdateProfileUserUseCase {
  constructor(private readonly userRepository: UserEntityRepository) {}

  async execute(
    user: Partial<PrimitiveUser>,
    userIdToken: string,
  ): Promise<UpdateUserResponse> {
    const { id, name, email, password } = user;

    if (id !== userIdToken) {
      return {
        error: true,
        data: {
          message: 'You do not have permission to update this profile',
        },
      };
    }

    if (!id || !name || !email) {
      return {
        error: true,
        data: {
          message: `User ${!id ? 'Id' : !name ? 'name' : 'email'} is required`,
        },
      };
    }

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
      new UserEntity(
        id,
        name,
        email,
        hashedPassword,
        existUserId.status,
        existUserId.role,
      ),
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
