import { test, expect } from '@playwright/test'
import { AuthApiClient } from '../../src/api/auth.client'
import { generateUser } from '../../src/utils/user-factory'
import { ENV } from '../../src/config/env.config'

test.describe('Auth API Client', () => {
  test('should register user via API and return valid JWT token', async ({ request }) => {
    const authClient = new AuthApiClient(request);
    const userPayload = generateUser();

    const response = await authClient.registerUser(userPayload);

    expect(response.user.token).toBeDefined();
    expect(response.user.token.length).toBeGreaterThan(20);
    expect(response.user.username).toBe(userPayload.username)
  })

  test('should login user via API and return valid JWT token', async ({ request }) => {
    const authClient = new AuthApiClient(request);
    const {email, username, password} = ENV.testUser;

    const response = await authClient.loginUser({email, password});

    expect(response.user.token).toBeDefined();
    expect(response.user.token.length).toBeGreaterThan(20);
    expect(response.user.username).toBe(username)

  });
})
