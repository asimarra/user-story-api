export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  error: boolean;
  data:
    | { message: string }
    | {
        id: string;
        name: string;
        email: string;
        role: string;
        token: string;
      };
}
