import BasePage from './base.page.js'

class LoginPage extends BasePage {
  static tabLoginSelectors = [
    'android=new UiSelector().description("Login")',
    '~Login',
    '//*[@content-desc="Login"]',
    '//*[@text="Login"]'
  ]
  static loginContainerSelectors = [
    'android=new UiSelector().description("button-login-container")',
    '~button-login-container',
    '~button-login',
    '//*[@content-desc="button-login-container"]'
  ]
  static signupContainerSelectors = [
    'android=new UiSelector().description("button-sign-up-container")',
    '~button-sign-up-container',
    '~button-signup-container',
    '//*[@content-desc="button-sign-up-container"]'
  ]
  static emailInputSelectors = [
    'android=new UiSelector().description("input-email")',
    '~input-email',
    '//*[@content-desc="input-email"]'
  ]
  static passwordInputSelectors = [
    'android=new UiSelector().description("input-password")',
    '~input-password',
    '//*[@content-desc="input-password"]'
  ]
  static loginButtonSelectors = [
    'android=new UiSelector().description("button-LOGIN")',
    '~button-LOGIN',
    '//*[@content-desc="button-LOGIN"]'
  ]
  static signupButtonSelectors = [
    'android=new UiSelector().description("button-SIGN UP")',
    '~button-SIGN UP',
    '~button-SIGNUP',
    '//*[@content-desc="button-SIGN UP"]'
  ]

  async openLogin() {
    await this.ensureAppInForeground()
    await this.tapFirstVisible(LoginPage.tabLoginSelectors)
    await this.tapFirstVisible(LoginPage.loginContainerSelectors)
    await this.waitForScreen(LoginPage.loginButtonSelectors)
  }

  async assertOnLoginTab() {
    await this.waitForScreen(LoginPage.loginButtonSelectors)
  }

  async loginWith(username, password) {
    await this.setValueFirstVisible(LoginPage.emailInputSelectors, username)
    await this.setValueFirstVisible(LoginPage.passwordInputSelectors, password)
    await this.tapFirstVisible(LoginPage.loginButtonSelectors)
  }

  async assertLoginError(expectedMessage) {
    const modalSource = await this.captureFeedbackSource([
      expectedMessage,
      'invalid',
      'not match',
      'wrong',
      'please enter',
      'valid email'
    ])
    const normalizedExpected = expectedMessage.toLowerCase()

    const isExpectedError =
      modalSource.includes(normalizedExpected) ||
      modalSource.includes('invalid') ||
      modalSource.includes('not match') ||
      modalSource.includes('wrong') ||
      modalSource.includes('please enter')

    if (!isExpectedError) {
      throw new Error('Mensagem de erro de login inesperada no modal')
    }
  }

  async assertLoginSuccess() {
    const modalSource = await this.getModalTextAndClose()

    const isSuccessMessage =
      modalSource.includes('success') ||
      modalSource.includes('logged in') ||
      modalSource.includes('you are logged in')

    if (!isSuccessMessage) {
      throw new Error('Mensagem de sucesso de login inesperada no modal')
    }
  }
}

export default new LoginPage()
