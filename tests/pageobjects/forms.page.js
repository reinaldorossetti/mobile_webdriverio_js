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

  static dropdownSelectors = [
    'android=new UiSelector().text("Select an item...")',
    '//*[@text="Select an item..."]'
  ]

  static dropdownOptionSelectors = [
    'android=new UiSelector().text("webdriver.io is awesome")',
    '//*[@text="webdriver.io is awesome"]'
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
    await this.waitForScreen(FormsPage.textInputSelectors)
    await this.setValue(FormsPage.textInputSelectors, text)
    await this.takeEvidence('forms-after-fill')
  }

  async selectDropdownOption() {
    await this.tapFirstVisible(FormsPage.dropdownSelectors)
    await this.tapFirstVisible(FormsPage.dropdownOptionSelectors)
  }

  async submitForm() {
    await this.tapFirstVisible(FormsPage.activeButtonSelectors)
  }

  async assertTextResultContains(expectedText) {
    const elementText = await this.findFirstVisible(FormsPage.textInputResultSelectors)
    const resultText = (await elementText.getText()).toLowerCase()
    await this.takeEvidence('forms-final')

    if (!resultText.includes(expectedText.toLowerCase())) {
      throw new Error(`Resultado do formulário não contém o texto esperado: ${expectedText}`)
    }
  }
}

export default new FormsPage()
