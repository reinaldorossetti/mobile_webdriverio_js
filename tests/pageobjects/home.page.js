import BasePage from './base.page.js'

class HomePage extends BasePage {
  static homeTabSelectors = [
    'android=new UiSelector().description("Home")',
    '~Home',
    '//*[@content-desc="Home"]',
    '//*[@text="Home"]'
  ]

  static homeScreenSelectors = [
    'android=new UiSelector().description("Home-screen")',
    '~Home-screen',
    '//*[@content-desc="Home-screen"]',
    '//*[@text="WEBDRIVER"]'
  ]

  async openHome() {
    await this.ensureAppInForeground()
    await this.tapFirstVisible(HomePage.homeTabSelectors)
    await this.waitForScreen(HomePage.homeScreenSelectors)
  }

  async assertOnHomeScreen() {
    await this.waitForScreen(HomePage.homeScreenSelectors)
  }
}

export default new HomePage()
