import { APIRequestContext, expect } from "@playwright/test";
import { UserData } from "../utils/user-factory";
import { UserAuthReponse } from "./models/auth.models";
import { ENV } from "../config/env.config";

export class AuthApiClient {
  private readonly request: APIRequestContext;
  private readonly baseUrl: string = ENV.API_URL;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async registerUser(userData: UserData): Promise<UserAuthReponse> {
    const response = await this.request.post(`${this.baseUrl}/users`, {
      data: {
        user: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      },
    });

    expect(response.ok()).toBeTruthy();


    const body = (await response.json() as UserAuthReponse);
    return body;
  }
}
