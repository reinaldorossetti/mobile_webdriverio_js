import BasePage from './base.page.js'

class NavigationPage extends BasePage {
  static homeTabSelectors = [
    'android=new UiSelector().description("Home")',
    '~Home',
    '//*[@content-desc="Home"]'
  ]

  static loginTabSelectors = [
    'android=new UiSelector().description("Login")',
    '~Login',
    '//*[@content-desc="Login"]'
  ]

  static formsTabSelectors = [
    'android=new UiSelector().description("Forms")',
    '~Forms',
    '//*[@content-desc="Forms"]'
  ]

  async goToHome() {
    await this.tapFirstVisible(NavigationPage.homeTabSelectors)
  }

  async goToLogin() {
    await this.tapFirstVisible(NavigationPage.loginTabSelectors)
  }

  async goToForms() {
    await this.tapFirstVisible(NavigationPage.formsTabSelectors)
  }
}

export default new NavigationPage()
