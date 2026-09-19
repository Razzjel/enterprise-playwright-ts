import { APIRequestContext, expect } from '@playwright/test';
import { UserData } from '../utils/user-factory';
import { LoginCredentials, UserAuthResponse } from './models/auth.models';
import { ENV } from '../config/env.config';

export class AuthApiClient {
  private readonly request: APIRequestContext;
  private readonly baseUrl: string = ENV.API_URL;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async registerUser(userData: UserData): Promise<UserAuthResponse> {
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

    const body = (await response.json()) as UserAuthResponse;
    return body;
  }

  async loginUser(credentials: LoginCredentials): Promise<UserAuthResponse> {
    const response = await this.request.post(`${this.baseUrl}/users/login`, {
      data: {
        user: {
          email: credentials.email,
          password: credentials.password,
        },
      },
    });

    if (!response.ok()) {
      const errorBody = await response.json();

      throw new Error(
        `Login request failed with status ${response.status()}: ${JSON.stringify(errorBody)}`,
      );
    }

    const body = (await response.json()) as UserAuthResponse;
    return body;
  }
}
