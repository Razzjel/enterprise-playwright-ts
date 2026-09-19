import { test as base, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';

type PageFixtures = {
  registerPage: RegisterPage;
};

export const test = base.extend<PageFixtures>({
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);

    await use(registerPage);
  },
});

export { expect };
