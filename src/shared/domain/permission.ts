import { Action } from './action.enum';
import { Resource } from './resources.enum';
import { Roles } from './roles.enum';

export interface PermissionEntity {
  resource: string;
  actions: Action[];
  role?: Roles;
}

export const PermissionByRole: PermissionEntity[] = [
  {
    role: Roles.USER,
    resource: Resource.USERS,
    actions: [Action.UPDATE_PROFILE],
  },
  {
    role: Roles.ADMIN,
    resource: Resource.USERS,
    actions: [Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE],
  },
  {
    role: Roles.USER,
    resource: Resource.PRODUCTS,
    actions: [Action.READ],
  },
  {
    role: Roles.ADMIN,
    resource: Resource.PRODUCTS,
    actions: [Action.CREATE, Action.UPDATE, Action.READ],
  },
  {
    role: Roles.USER,
    resource: Resource.INVOICES,
    actions: [Action.CREATE, Action.READ],
  },
  {
    role: Roles.ADMIN,
    resource: Resource.INVOICES,
    actions: [Action.READ],
  },
];
