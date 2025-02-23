import { Roles } from '@src/shared/domain/roles.enum';
import { UserEntity, UserStatus } from './user.entity';

export interface findAllResponse {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  role: Roles;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class UserEntityRepository {
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findAll(
    limit?: number,
    offset?: number,
  ): Promise<findAllResponse[] | null>;
  abstract create(user: UserEntity): Promise<string | null>;
  abstract findById(userId: string): Promise<UserEntity | null>;
}
