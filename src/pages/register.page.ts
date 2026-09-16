import { Page, Locator, expect } from '@playwright/test'
import { UserData } from '../utils/user-factory';

export class RegisterPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly form_submit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.form_submit = page.getByRole('button', { name: 'Sign up'});
  }

  async goto(): Promise<void> {
    await this.page.goto('/register');
    await expect(this.page.getByRole('heading', { name: 'Sign up' })).toBeVisible();
  }

  async register(userData: UserData): Promise<void> {
    await this.usernameInput.fill(userData.username);
    await this.emailInput.fill(userData.email);
    await this.passwordInput.fill(userData.password);
    await this.form_submit.click();
  }
}
