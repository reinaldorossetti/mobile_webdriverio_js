import BasePage from './base.page.js'

class SignupPage extends BasePage {
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

  static repeatPasswordInputSelectors = {
    ios: [
      '~input-repeat-password',
      '-ios predicate string:label == "input-repeat-password" OR name == "input-repeat-password"'
    ],
    android: [
      'android=new UiSelector().description("input-repeat-password")',
      '~input-repeat-password',
      '//*[@content-desc="input-repeat-password"]'
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

  async openSignup() {
    await this.ensureAppInForeground()
    await this.tapFirstVisible(SignupPage.tabLoginSelectors)
    await this.tapFirstVisible(SignupPage.signupContainerSelectors)
  }

  async assertOnSignupTab() {
    await this.waitForScreen(SignupPage.signupButtonSelectors)
  }

  async switchToLoginTab() {
    await this.tapFirstVisible(SignupPage.loginContainerSelectors)
    await this.waitForScreen(SignupPage.loginButtonSelectors)
  }

  async fillSignupForm(userData) {
    await this.waitForScreen(SignupPage.emailInputSelectors)
    await this.setValue(SignupPage.emailInputSelectors, userData.email ?? '')
    await this.setValue(SignupPage.passwordInputSelectors, userData.password ?? '')
    await this.setValue(
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
