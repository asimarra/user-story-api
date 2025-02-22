import { MyInjectable } from '@shared/dependency-injection/my-injectable';
import { UserEntityRepository } from '../domain/user.repository.interface';
import { UserEntity } from '../domain/user.entity';

@MyInjectable()
export class FindUserByEmailUseCase {
  constructor(private readonly userRepository: UserEntityRepository) {}

  async execute(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findByEmail(email);

    return user
      ? new UserEntity(
          user.id,
          user.name,
          user.email,
          user.password,
          user.status,
          user.role,
        )
      : null;
  }
}
