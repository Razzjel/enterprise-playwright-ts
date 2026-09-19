import { test, expect } from '@playwright/test';
import { AuthApiClient } from '../../src/api/auth.client';
import { generateUser } from '../../src/utils/user-factory';
import { ENV } from '../../src/config/env.config';

test.describe('Auth API Client', () => {
  test('should register user via API and return valid JWT token', async ({ request }) => {
    const authClient = new AuthApiClient(request);
    const userPayload = generateUser();

    const response = await authClient.registerUser(userPayload);
    const { token, username } = response.user;

    expect(token).toBeDefined();
    expect(token.length).toBeGreaterThan(20);
    expect(username).toBe(userPayload.username);
  });

  test('should login user via API and return valid JWT token', async ({ request }) => {
    const authClient = new AuthApiClient(request);
    const { email, username, password } = ENV.testUser;

    const response = await authClient.loginUser({ email, password });
    const { token } = response.user;

    expect(token).toBeDefined();
    expect(token.length).toBeGreaterThan(20);
    expect(response.user.username).toBe(username);
  });

  test('should reject login when password is invalid', async ({ request }) => {
    const authClient = new AuthApiClient(request);

    await expect(
      authClient.loginUser({
        email: ENV.testUser.email,
        password: 'incorrectpassword',
      }),
    ).rejects.toThrow(/status 401/);
  });
});
