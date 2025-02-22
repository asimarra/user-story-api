export abstract class TokenService {
  abstract generate(payload: object): Promise<string>;
}
