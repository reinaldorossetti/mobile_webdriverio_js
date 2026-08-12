import BasePage from './base.page.js'

class FormsPage extends BasePage {
  static formsTabSelectors = {
    ios: [
      '~Forms',
      '-ios predicate string:label == "Forms" OR name == "Forms"'
    ],
    android: [
      'android=new UiSelector().description("Forms")',
      '~Forms',
      '//*[@content-desc="Forms"]',
      '//*[@text="Forms"]'
    ]
  }

  static formsScreenSelectors = {
    ios: [
      '~Forms-screen',
      '-ios predicate string:label == "Form components" OR name == "Form components"'
    ],
    android: [
      'android=new UiSelector().description("Forms-screen")',
      '~Forms-screen',
      '//*[@content-desc="Forms-screen"]',
      '//*[@text="Form components"]'
    ]
  }

  static textInputSelectors = {
    ios: [
      '~text-input',
      '-ios predicate string:label == "text-input" OR name == "text-input"'
    ],
    android: [
      'android=new UiSelector().description("text-input")',
      '~text-input',
      '//*[@content-desc="text-input"]',
      '//*[@hint="Type something"]'
    ]
  }

  static textInputResultSelectors = {
    ios: [
      '~input-text-result',
      '-ios predicate string:label == "input-text-result" OR name == "input-text-result"'
    ],
    android: [
      'android=new UiSelector().description("input-text-result")',
      '~input-text-result',
      '//*[@content-desc="input-text-result"]'
    ]
  }

  static dropdownSelectors = {
    ios: [
      '~Dropdown',
      '-ios predicate string:label == "Select an item..." OR name == "Select an item..."',
      '//*[@label="Select an item..."]'
    ],
    android: [
      'android=new UiSelector().text("Select an item...")',
      '//*[@text="Select an item..."]'
    ]
  }

  static dropdownOptionSelectors = {
    ios: [
      '~webdriver.io is awesome',
      '-ios predicate string:label == "webdriver.io is awesome" OR name == "webdriver.io is awesome"',
      '//*[@label="webdriver.io is awesome"]'
    ],
    android: [
      'android=new UiSelector().text("webdriver.io is awesome")',
      '//*[@text="webdriver.io is awesome"]'
    ]
  }

  static activeButtonSelectors = {
    ios: [
      '~button-Active',
      '-ios predicate string:label == "Active" OR name == "button-Active"'
    ],
    android: [
      'android=new UiSelector().description("button-Active")',
      '~button-Active',
      '//*[@content-desc="button-Active"]',
      '//*[@text="Active"]'
    ]
  }

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
