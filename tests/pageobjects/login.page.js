import BasePage from './base.page.js'

class LoginPage extends BasePage {
  static tabLoginSelectors = [
    '~Login',
    'android=new UiSelector().description("Login")',
    '//*[@content-desc="Login"]',
    '//*[@text="Login"]'
  ]
  static loginContainerSelectors = [
    '~button-login',
    'android=new UiSelector().description("button-login-container")',
    '~button-login-container',
    '//*[@content-desc="button-login-container"]'
  ]
  static signupContainerSelectors = [
    '~button-sign-up-container',
    'android=new UiSelector().description("button-sign-up-container")',
    '~button-signup-container',
    '//*[@content-desc="button-sign-up-container"]'
  ]
  static emailInputSelectors = [
    '~input-email',
    'android=new UiSelector().description("input-email")',
    '//*[@content-desc="input-email"]'
  ]
  static passwordInputSelectors = [
    '~input-password',
    'android=new UiSelector().description("input-password")',
    '//*[@content-desc="input-password"]'
  ]
  static loginButtonSelectors = [
    '~button-LOGIN',
    'android=new UiSelector().description("button-LOGIN")',
    '//*[@content-desc="button-LOGIN"]'
  ]
  static signupButtonSelectors = [
    '~button-SIGN UP',
    'android=new UiSelector().description("button-SIGN UP")',
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
    await this.setValue(LoginPage.emailInputSelectors, username)
    await this.setValue(LoginPage.passwordInputSelectors, password)
    await this.tapFirstVisible(LoginPage.loginButtonSelectors)
    await this.takeEvidence('LoginPage-login-attempt')
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
