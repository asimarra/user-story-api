import {
  findAllResponse,
  UserEntityRepository,
} from '@contexts/users/domain/user.repository.interface';
import { UserEntity } from '@contexts/users/domain/user.entity';
import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';
import { User } from './user.db';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@MyInjectable()
export class MongooseUserRepository extends UserEntityRepository {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {
    super();
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.UserModel.findOne({ email });

    return user
      ? new UserEntity(
          user._id as string,
          user.name,
          user.email,
          user.password,
          user.status,
          user.role,
        )
      : null;
  }

  async findAll(
    limit: number = 10,
    offset: number = 0,
  ): Promise<findAllResponse[] | null> {
    const users = await this.UserModel.find().skip(offset).limit(limit);

    return users.map((user) => ({
      id: user._id as string,
      name: user.name,
      email: user.email,
      status: user.status,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  async create(user: UserEntity): Promise<string | null> {
    const createdUser = await this.UserModel.create(user);
    return (createdUser._id as string).toString() ?? null;
  }

  async findById(userId: string): Promise<UserEntity | null> {
    const user = await this.UserModel.findOne({
      _id: userId,
    });

    if (!user) {
      return null;
    }

    return new UserEntity(
      user._id as string,
      user.name,
      user.email,
      user.password,
      user.status,
      user.role,
    );
  }

  async update(user: UserEntity): Promise<string | null> {
    const updatedUser = await this.UserModel.updateOne(
      {
        _id: user.id,
      },
      user,
    );

    return updatedUser?.acknowledged ? user.id : null;
  }
}
