import { Page, Locator } from '@playwright/test';
import { logger } from '@utils/logger';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    logger.info(`Navigating to ${url}`);
    await this.page.goto(url);
  }

  async click(locator: Locator): Promise<void> {
    logger.info(`Clicking element: ${locator}`);
    await locator.click();
  }

  async fill(locator: Locator, value: string): Promise<void> {
    logger.info(`Filling ${locator} with value: ${value}`);
    await locator.fill(value);
  }

  async getText(locator: Locator): Promise<string> {
    logger.info(`Getting text from: ${locator}`);
    return await locator.textContent() || '';
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async waitForElement(locator: Locator, timeout: number = 5000): Promise<void> {
    logger.info(`Waiting for element: ${locator}`);
    await locator.waitFor({ timeout });
  }

  async takeScreenshot(name: string): Promise<void> {
    logger.info(`Taking screenshot: ${name}`);
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }
}