import BasePage from './base.page.js'

class SignupPage extends BasePage {
  static tabLoginSelectors = [
    '~Login',
    'android=new UiSelector().description("Login")',
    '//*[@content-desc="Login"]',
    '//*[@text="Login"]'
  ]
  static signupContainerSelectors = [
    '~button-sign-up-container',
    '~button-signup-container',
    'android=new UiSelector().description("button-sign-up-container")',
    '//*[@content-desc="button-sign-up-container"]'
  ]
  static loginContainerSelectors = [
    '~button-login-container',
    '~button-login',
    'android=new UiSelector().description("button-login-container")',
    '//*[@content-desc="button-login-container"]'
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
  static repeatPasswordInputSelectors = [
    '~input-repeat-password',
    'android=new UiSelector().description("input-repeat-password")',
    '//*[@content-desc="input-repeat-password"]'
  ]
  static signupButtonSelectors = [
    '~button-SIGN UP',
    '~button-SIGNUP',
    'android=new UiSelector().description("button-SIGN UP")',
    '//*[@content-desc="button-SIGN UP"]'
  ]
  static loginButtonSelectors = [
    '~button-LOGIN',
    'android=new UiSelector().description("button-LOGIN")',
    '//*[@content-desc="button-LOGIN"]'
  ]

  async openSignup() {
    await this.ensureAppInForeground()
    await this.tapFirstVisible(SignupPage.tabLoginSelectors)
    await this.tapFirstVisible(SignupPage.signupContainerSelectors)
    await this.waitForScreen(SignupPage.signupButtonSelectors)
  }

  async assertOnSignupTab() {
    await this.waitForScreen(SignupPage.signupButtonSelectors)
  }

  async switchToLoginTab() {
    await this.tapFirstVisible(SignupPage.loginContainerSelectors)
    await this.waitForScreen(SignupPage.loginButtonSelectors)
  }

  async fillSignupForm(userData) {
    await this.setValueFirstVisible(SignupPage.emailInputSelectors, userData.email ?? '')
    await this.setValueFirstVisible(SignupPage.passwordInputSelectors, userData.password ?? '')
    await this.setValueFirstVisible(
      SignupPage.repeatPasswordInputSelectors,
      userData.repeatPassword ?? userData.password ?? ''
    )
  }

  async submitSignup() {
    await this.tapFirstVisible(SignupPage.signupButtonSelectors)
  }

  async registerUser(userData) {
    await this.fillSignupForm(userData)
    await this.submitSignup()
    await this.assertSignupSuccess()
  }

  async assertSignupSuccess() {
    const modalSource = await this.getModalTextAndClose()

    const isSuccessMessage =
      modalSource.includes('signed up') &&
      modalSource.includes('you successfully signed up')

    if (!isSuccessMessage) {
      throw new Error('Mensagem de sucesso de cadastro inesperada no modal')
    }
  }

  async assertSignupError(expectedMessage) {
    const modalSource = await this.captureFeedbackSource([
      expectedMessage,
      'please enter',
      'do not match',
      'valid email',
      'password'
    ])
    const normalizedExpected = expectedMessage.toLowerCase()

    const isExpectedError =
      modalSource.includes(normalizedExpected) ||
      modalSource.includes('please enter') ||
      modalSource.includes('do not match')

    if (!isExpectedError) {
      throw new Error('Mensagem de erro de cadastro inesperada no modal')
    }
  }
}

export default new SignupPage()
