import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
  Inject,
} from '@nestjs/common';
import errors from '@src/config/errors.config';
import { TokenService } from '@src/shared/domain/token-service.interface';
import { Request } from 'express';
import { Observable } from 'rxjs';

export interface CustomRequest extends Request {
  userId?: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject() private readonly tokenService: TokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException({
        ...errors.unauthorized,
        message: 'Token is required',
      });
    }

    try {
      const validateTokenResponse = this.tokenService.validateToken(token);
      request.userId = validateTokenResponse.userId;

      return true;
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException(errors.unauthorized);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
