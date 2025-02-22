import { ConfigService } from '@nestjs/config';
import { MyInjectable } from './dependency-injection/my-injectable';
import { TokenService } from '../domain/token-service.interface';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from '../domain/token.entity';

@MyInjectable()
export class JwtTokenService extends TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  generate(payload: TokenEntity): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwtSecret'),
    });
  }

  validateToken(token: string): TokenEntity {
    return this.jwtService.verify<TokenEntity>(token, {
      secret: this.configService.get<string>('jwtSecret'),
    });
  }
}
