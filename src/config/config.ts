import dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || 'https://eventhub.rahulshettyacademy.com/login',
  browser: process.env.BROWSER || 'chromium',
  headless: process.env.HEADLESS === 'true',
  timeout: parseInt(process.env.TIMEOUT || '30000'),
  parallelWorkers: parseInt(process.env.PARALLEL_WORKERS || '3'),
  screenshotsOnFailure: true,
  slowMo: 0,
};