import { test, expect } from '@playwright/test';
import { generateUser } from '../../src/utils/user-factory';

test.describe('User Factory - Unit Tests', () => {
  test('should generate a valid user object with required fields', () => {
    const user = generateUser();

    // Email
    expect(user.email).toBeDefined();
    expect(user.email).toContain('@');

    // Password
    expect(user.password).toBeDefined();
    expect(user.password).toHaveLength(12);

    // Username - length and no space/special characters
    expect(user.username).toBeDefined();
    expect(user.username).toHaveLength(10);
    expect(user.username).toMatch(/^[a-zA-Z0-9]+$/);
  });

  test('should generate unique data on subsequent calls', () => {
    const user1 = generateUser();
    const user2 = generateUser();

    expect(user1.username).not.toEqual(user2.username);
    expect(user1.email).not.toEqual(user2.email);
  });
});
