import { Roles } from '@shared/domain/roles.entity';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  DELETED = 'DELETED',
}

export interface PrimitiveUser {
  id: string;
  name: string;
  email: string;
  password: string;
  status: UserStatus;
  role: Roles;
  createdAt: Date;
  updatedAt: Date;
}

export class UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  status: UserStatus;
  role: Roles;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    status: UserStatus,
    role: Roles,
  ) {
    this.id = id || '';
    this.name = name;
    this.email = email;
    this.password = password;
    this.status = status || UserStatus.ACTIVE;
    this.role = role || Roles.USER;
  }

  fromJson(json: PrimitiveUser): UserEntity {
    return new UserEntity(
      json.id,
      json.name,
      json.email,
      json.password,
      json.status,
      json.role,
    );
  }

  toJson(): PrimitiveUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      status: this.status,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
