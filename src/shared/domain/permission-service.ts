import { PermissionByRole, PermissionEntity } from './permission';
import { Roles } from './roles.enum';

export const getPermissionByRole = (role: Roles): PermissionEntity[] => {
  return PermissionByRole.filter((p) => p.role === role);
};
