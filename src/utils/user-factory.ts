import { faker } from '@faker-js/faker';

export interface UserData {
  username: string;
  email: string;
  password: string;
}

export const generateUser = (): UserData => ({
  username: faker.string.alphanumeric({length: 10}),
  email: faker.internet.email({provider: 'test-qa-local'}),
  password: faker.internet.password({length: 12})
});
