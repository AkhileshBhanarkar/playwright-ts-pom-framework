import { test, expect } from '@fixtures/fixtures';
import { testData } from '@utils/test-data';
import { config } from '@config/config';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateTo(config.baseUrl);
  });

  test('should login successfully with valid credentials', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await dashboardPage.page.waitForLoadState('networkidle');
    
    const userEmail = await dashboardPage.getUserEmail();
    console.log(`Logged in user email: ${userEmail}`);
    expect(userEmail).toBe(testData.validUser.username);
  });

  test('should display error with invalid credentials', async ({ loginPage }) => {
    await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);
    
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    console.log(`Is error message displayed: ${isErrorDisplayed}`);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Invalid email or password');
  });

  test('should login and logout successfully', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await dashboardPage.page.waitForLoadState('networkidle');
    
    await dashboardPage.logout();
    await loginPage.waitForElement(loginPage.loginButton);
    
    expect(await loginPage.page.url()).not.toContain('dashboard');
  });
});