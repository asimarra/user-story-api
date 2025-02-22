export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  error: boolean;
  data:
    | { message: string }
    | {
        userId: string;
        name: string;
        email: string;
        role: string;
        token: string;
      };
}
