import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomRequest } from './auth.guard';
import errors from '@src/config/errors.config';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { UserEntityRepository } from '@src/contexts/users/domain/user.repository.interface';
import { getPermissionByRole } from '@src/shared/domain/permission-service';
import { Roles } from '@src/shared/domain/roles.enum';
import { PermissionEntity } from '@src/shared/domain/permission';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userRepository: UserEntityRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();

    if (!request.userId) {
      throw new UnauthorizedException({
        ...errors.unauthorized,
        message: 'User Id not found',
      });
    }

    try {
      const routePermissions = this.reflector.getAllAndOverride<
        PermissionEntity[]
      >(PERMISSIONS_KEY, [context.getClass(), context.getHandler()]);
      const userData = await this.userRepository.findById(request.userId);
      const permissionsByRole = getPermissionByRole(userData?.role as Roles);

      return this.validatePermissions(routePermissions, permissionsByRole);
    } catch (error) {
      Logger.error(error);
      throw new ForbiddenException(errors.forbidden);
    }
  }

  private validatePermissions(
    routePermissions: PermissionEntity[],
    permissionsByRole: PermissionEntity[],
  ): boolean {
    for (const routePermission of routePermissions) {
      const userPermission = permissionsByRole.find(
        (pr) => pr.resource === routePermission.resource,
      );

      if (!userPermission) {
        throw new ForbiddenException(errors.forbidden);
      }

      const allActionsAvailable = routePermission.actions.every((ra) =>
        userPermission.actions.includes(ra),
      );

      if (!allActionsAvailable) {
        throw new ForbiddenException(errors.forbidden);
      }
    }

    return true;
  }
}
