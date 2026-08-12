import BasePage from './base.page.js'

class HomePage extends BasePage {
  static homeTabSelectors = {
    ios: [
      '~Home',
      '-ios predicate string:label == "Home" OR name == "Home"',
      '//*[@name="Home"]'
    ],
    android: [
      'android=new UiSelector().description("Home")',
      '~Home',
      '//*[@content-desc="Home"]',
      '//*[@text="Home"]'
    ]
  }

  static homeScreenSelectors = {
    ios: [
      '~Home-screen',
      '-ios predicate string:label == "WEBDRIVER" OR name == "WEBDRIVER"',
      '//*[@name="WEBDRIVER"]'
    ],
    android: [
      'android=new UiSelector().description("Home-screen")',
      '~Home-screen',
      '//*[@content-desc="Home-screen"]',
      '//*[@text="WEBDRIVER"]'
    ]
  }

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
