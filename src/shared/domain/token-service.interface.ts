import { TokenEntity } from './token.entity';

export abstract class TokenService {
  abstract generate(payload: TokenEntity): string;
  abstract validateToken(token: string): TokenEntity;
}
