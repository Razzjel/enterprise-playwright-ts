export interface UserAuthReponse {
  user: {
    username: string;
    email: string;
    password: string;
    token: string;
  }
}
