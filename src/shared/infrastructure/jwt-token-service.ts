import { ConfigService } from '@nestjs/config';
import { MyInjectable } from '../dependency-injection/my-injectable';
import { TokenService } from '../domain/token-service.interface';
import { JwtService } from '@nestjs/jwt';

@MyInjectable()
export class JwtTokenService extends TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async generate(payload: object): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwtSecret'),
    });
  }
}
