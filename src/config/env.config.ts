import 'dotenv/config';

const email = process.env.TEST_USER_EMAIL;
const username = process.env.TEST_USER_USERNAME;
const password = process.env.TEST_USER_PASSWORD;

if (!email || !password || !username) {
  throw new Error('Missing TEST_USER_EMAIL, TEST_USER_USERNAME or TEST_USER_PASSWORD in .env');
}

export const ENV = {
  UI_URL: process.env.UI_URL || 'https://demo.realworld.show',
  API_URL: process.env.API_URL || 'https://api.realworld.show/api',
  testUser: {
    email,
    username,
    password,
  },
};
