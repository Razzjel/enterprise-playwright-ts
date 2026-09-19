export interface UserAuthResponse {
  user: {
    username: string;
    email: string;
    password: string;
    token: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}
