export interface UpdateUserResponse {
  error: boolean;
  data:
    | { message: string }
    | {
        userId: string;
      };
}
