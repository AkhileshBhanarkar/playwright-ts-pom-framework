import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly userEmailDisplay: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.userEmailDisplay = page.locator('span[id="user-email-display"]');
    this.logoutButton = page.locator('button[id="logout-btn"]');
  }

  async getUserEmail(): Promise<string> {
    return await this.getText(this.userEmailDisplay);
  }

  async logout(): Promise<void> {
    await this.click(this.logoutButton);
  }
}