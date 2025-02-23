export interface CreateUserResponse {
  error: boolean;
  data:
    | { message: string }
    | {
        userId: string;
      };
}
