import { test, expect, Page } from '@playwright/test'
import { RegisterPage } from '../../src/pages/register.page';
import { generateUser } from '../../src/utils/user-factory';

test.describe('Authentication', () => {
  test('should register a new user successfully', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    const user = generateUser();

    await registerPage.goto();
    await registerPage.register(user);

    const userProfileLink = page.getByRole('link', { name: user.username });
    await expect(userProfileLink).toBeVisible();
  });
});
