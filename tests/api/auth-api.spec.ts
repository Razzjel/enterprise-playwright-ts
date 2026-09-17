import { test, expect } from '@playwright/test'
import { AuthApiClient } from '../../src/api/auth.client'
import { generateUser } from '../../src/utils/user-factory'

test.describe('Auth API Client', () => {
  test('should register user via API and return valid JWT token', async ({ request }) => {
    const authClient = new AuthApiClient(request);
    const userPayload = generateUser();

    const response = await authClient.registerUser(userPayload);

    expect(response.user.token).toBeDefined();
    expect(response.user.token.length).toBeGreaterThan(20);
    expect(response.user.username).toBe(userPayload.username)
  })
})
