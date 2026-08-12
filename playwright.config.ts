import { defineConfig, devices } from '@playwright/test';
import { config } from './src/config/config';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : config.parallelWorkers,
  reporter: [
    ['html'],
    ['allure-playwright'],
    ['list']
  ],
  use: {
    baseURL: config.baseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: process.env.CI ? true : config.headless },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], headless: process.env.CI ? true : config.headless },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], headless: process.env.CI ? true : config.headless },
    },
  ],
});