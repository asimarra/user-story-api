import { MyInjectable } from '@shared/dependency-injection/my-injectable';
import {
  findAllResponse,
  UserEntityRepository,
} from '../domain/user.repository.interface';

@MyInjectable()
export class FindAllUserUseCase {
  constructor(private readonly userRepository: UserEntityRepository) {}

  async execute(
    limit: number,
    offset: number,
  ): Promise<findAllResponse[] | null> {
    return this.userRepository.findAll(limit, offset);
  }
}
