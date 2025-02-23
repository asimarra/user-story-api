import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { UserEntityRepository } from '../domain/user.repository.interface';
import { UserEntity, UserStatus } from '../domain/user.entity';
import { DeleteUserResponse } from '../domain/delete-user.dto';

@MyInjectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserEntityRepository) {}

  async execute(
    userId: string,
    status: UserStatus,
  ): Promise<DeleteUserResponse> {
    const existUserId = await this.userRepository.findById(userId);
    if (!existUserId) {
      return {
        error: true,
        data: {
          message: 'User Id does not exist',
        },
      };
    }

    const user = new UserEntity(
      existUserId.id,
      existUserId.name,
      existUserId.email,
      existUserId.password,
      status,
      existUserId.role,
    );
    const deleteResponse = await this.userRepository.update(user);

    if (!deleteResponse) {
      return {
        error: true,
        data: {
          message: 'Error deleting the user',
        },
      };
    }

    return {
      error: false,
      data: user.toJson(),
    };
  }
}
