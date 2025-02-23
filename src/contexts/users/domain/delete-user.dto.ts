import { PrimitiveUser } from './user.entity';

export interface DeleteUserResponse {
  error: boolean;
  data: { message: string } | PrimitiveUser;
}
