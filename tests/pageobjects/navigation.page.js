import BasePage from './base.page.js'

class NavigationPage extends BasePage {
  static homeTabSelectors = {
    ios: [
      '~Home',
      '-ios predicate string:label == "Home" OR name == "Home"',
      '//*[@name="Home"]'
    ],
    android: [
      'android=new UiSelector().description("Home")',
      '~Home',
      '//*[@content-desc="Home"]'
    ]
  }

  static loginTabSelectors = {
    ios: [
      '~Login',
      '-ios predicate string:label == "Login" OR name == "Login"',
      '//*[@name="Login"]'
    ],
    android: [
      'android=new UiSelector().description("Login")',
      '~Login',
      '//*[@content-desc="Login"]'
    ]
  }

  static formsTabSelectors = {
    ios: [
      '~Forms',
      '-ios predicate string:label == "Forms" OR name == "Forms"',
      '//*[@name="Forms"]'
    ],
    android: [
      'android=new UiSelector().description("Forms")',
      '~Forms',
      '//*[@content-desc="Forms"]'
    ]
  }

  async goToHome() {
    await this.tapFirstVisible(NavigationPage.homeTabSelectors)
  }

  async goToLogin() {
    await this.tapFirstVisible(NavigationPage.loginTabSelectors)
  }

  async goToForms() {
    await this.tapFirstVisible(NavigationPage.formsTabSelectors)
    await this.takeEvidence('goToForms-after-tap')
  }
}

export default new NavigationPage()
