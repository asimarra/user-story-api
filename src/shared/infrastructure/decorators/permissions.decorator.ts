import { SetMetadata } from '@nestjs/common';
import { Action } from '@src/shared/domain/action.enum';
import { Resource } from '@src/shared/domain/resources.enum';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (
  permissions: { resource: Resource; actions: Action[] }[],
) => SetMetadata(PERMISSIONS_KEY, permissions);
