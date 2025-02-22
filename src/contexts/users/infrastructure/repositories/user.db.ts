import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Roles } from '@src/shared/domain/roles.entity';
import { Document } from 'mongoose';
import { UserStatus } from '../../domain/user.entity';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  status: UserStatus;

  @Prop()
  role: Roles;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
