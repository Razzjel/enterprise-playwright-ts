import { test, expect } from '@playwright/test'
import { AuthApiClient } from '../../src/api/auth.client';
import { generateUser } from '../../src/utils/user-factory';

test.describe('Home Page', () => {
  test('should open home page as logged in user', async ({ page, request }) => {
    const user = generateUser();

    const authClient = new AuthApiClient(request);
    const authResponse = await authClient.registerUser(user);
    const authToken = authResponse.user.token

    await page.addInitScript((token) => {
      window.localStorage.setItem('jwtToken', token);
    }, authToken);

    await page.goto('/')
    await expect(page.getByRole('link', { name: user.username })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Your Feed' })).toBeVisible();

  });
});
