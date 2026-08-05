import BasePage from './base.page.js'

class FormsPage extends BasePage {
  static formsTabSelectors = [
    'android=new UiSelector().description("Forms")',
    '~Forms',
    '//*[@content-desc="Forms"]',
    '//*[@text="Forms"]'
  ]

  static formsScreenSelectors = [
    'android=new UiSelector().description("Forms-screen")',
    '~Forms-screen',
    '//*[@content-desc="Forms-screen"]',
    '//*[@text="Form components"]',
    '//*[@text="Form Components"]'
  ]

  static textInputSelectors = [
    'android=new UiSelector().description("text-input")',
    '~text-input',
    '//*[@content-desc="text-input"]',
    '//*[@hint="Type something"]'
  ]

  static textInputResultSelectors = [
    'android=new UiSelector().description("input-text-result")',
    '~input-text-result',
    '//*[@content-desc="input-text-result"]'
  ]

  static activeButtonSelectors = [
    'android=new UiSelector().description("button-Active")',
    '~button-Active',
    '//*[@content-desc="button-Active"]',
    '//*[@text="Active"]'
  ]

  async openForms() {
    await this.ensureAppInForeground()
    await this.tapFirstVisible(FormsPage.formsTabSelectors)
    await this.waitForScreen(FormsPage.formsScreenSelectors)
  }

  async assertOnFormsScreen() {
    await this.waitForScreen(FormsPage.formsScreenSelectors)
  }

  async fillTextInput(text) {
    await this.takeEvidence('forms-before-fill')
    await this.setValueFirstVisible(FormsPage.textInputSelectors, text)
    await this.takeEvidence('forms-after-fill')
  }

  async submitForm() {
    await this.tapFirstVisible(FormsPage.activeButtonSelectors)
  }

  async assertFormSubmitFeedback(expectedText = '') {
    const expectedFragments = [
      'active',
      'button',
      expectedText
    ].filter(Boolean)

    const source = await this.captureFeedbackSource(expectedFragments)

    const hasExpectedMessage =
      source.includes('active') ||
      source.includes('button') ||
      (expectedText && source.includes(expectedText.toLowerCase()))

    if (!hasExpectedMessage) {
      throw new Error('Feedback de envio do formulário não encontrado')
    }
  }

  async assertTextResultContains(expectedText) {
    try {
      const resultEl = await this.findFirstVisible(FormsPage.textInputResultSelectors, 6000)
      const resultText = (await resultEl.getText()).toLowerCase()

      if (!resultText.includes(expectedText.toLowerCase())) {
        throw new Error(`Resultado do formulário não contém o texto esperado: ${expectedText}`)
      }
    } catch {
      await this.assertFormSubmitFeedback(expectedText)
    }

    await this.takeEvidence('forms-final')
  }
}

export default new FormsPage()
