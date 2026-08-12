import BasePage from './base.page.js'

class LoginPage extends BasePage {
  static tabLoginSelectors = {
    ios: [
      '~Login',
      '-ios predicate string:label == "Login" OR name == "Login"'
    ],
    android: [
      'android=new UiSelector().description("Login")',
      '~Login',
      '//*[@content-desc="Login"]',
      '//*[@text="Login"]'
    ]
  }

  static loginContainerSelectors = {
    ios: [
      '~button-login-container',
      '~button-login',
      '-ios predicate string:label == "button-login-container" OR name == "button-login-container"'
    ],
    android: [
      'android=new UiSelector().description("button-login-container")',
      '~button-login-container',
      '//*[@content-desc="button-login-container"]'
    ]
  }

  static signupContainerSelectors = {
    ios: [
      '~button-sign-up-container',
      '~button-signup-container',
      '-ios predicate string:label == "button-sign-up-container" OR name == "button-sign-up-container"'
    ],
    android: [
      'android=new UiSelector().description("button-sign-up-container")',
      '~button-sign-up-container',
      '//*[@content-desc="button-sign-up-container"]'
    ]
  }

  static emailInputSelectors = {
    ios: [
      '~input-email',
      '-ios predicate string:label == "input-email" OR name == "input-email"'
    ],
    android: [
      'android=new UiSelector().description("input-email")',
      '~input-email',
      '//*[@content-desc="input-email"]'
    ]
  }

  static passwordInputSelectors = {
    ios: [
      '~input-password',
      '-ios predicate string:label == "input-password" OR name == "input-password"'
    ],
    android: [
      'android=new UiSelector().description("input-password")',
      '~input-password',
      '//*[@content-desc="input-password"]'
    ]
  }

  static loginButtonSelectors = {
    ios: [
      '~button-LOGIN',
      '-ios predicate string:label == "LOGIN" OR name == "button-LOGIN"'
    ],
    android: [
      'android=new UiSelector().description("button-LOGIN")',
      '~button-LOGIN',
      '//*[@content-desc="button-LOGIN"]'
    ]
  }

  static signupButtonSelectors = {
    ios: [
      '~button-SIGN UP',
      '~button-SIGNUP',
      '-ios predicate string:label == "SIGN UP" OR name == "button-SIGN UP"'
    ],
    android: [
      'android=new UiSelector().description("button-SIGN UP")',
      '~button-SIGN UP',
      '//*[@content-desc="button-SIGN UP"]'
    ]
  }

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
