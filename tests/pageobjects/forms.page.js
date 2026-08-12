import BasePage from './base.page.js'

class FormsPage extends BasePage {
  static formsTabSelectors = {
    ios: [
      '~Forms',
      '-ios predicate string:name == "Forms" OR label == "Forms"',
      '//XCUIElementTypeButton[@name="Forms"]'
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
      '-ios predicate string:name == "Forms-screen" OR label == "Form components" OR name == "Form components"',
      '//XCUIElementTypeOther[@name="Forms-screen"]',
      '//XCUIElementTypeStaticText[@name="Form components"]'
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
      '-ios predicate string:name == "text-input" OR placeholderValue == "Type something" OR value == "Type something"',
      '//XCUIElementTypeTextField[@name="text-input"]'
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
      '-ios predicate string:name == "input-text-result" OR label == "input-text-result"',
      '//XCUIElementTypeStaticText[@name="input-text-result"]'
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
      '-ios predicate string:name == "Dropdown" OR value == "Select an item..." OR label == "Select an item..."',
      '//XCUIElementTypeOther[@name="Dropdown"]',
      '//XCUIElementTypeTextField[@value="Select an item..."]'
    ],
    android: [
      'android=new UiSelector().text("Select an item...")',
      '//*[@text="Select an item..."]'
    ]
  }

  static dropdownOptionSelectors = {
    ios: [
      '~webdriver.io is awesome',
      '-ios predicate string:label == "webdriver.io is awesome" OR name == "webdriver.io is awesome" OR value == "webdriver.io is awesome"',
      '//XCUIElementTypePickerWheel',
      '//*[@label="webdriver.io is awesome"]',
      '//*[@value="webdriver.io is awesome"]'
    ],
    android: [
      'android=new UiSelector().text("webdriver.io is awesome")',
      '//*[@text="webdriver.io is awesome"]'
    ]
  }

  static activeButtonSelectors = {
    ios: [
      '~button-Active',
      '-ios predicate string:name == "button-Active" OR label == "Active"',
      '//XCUIElementTypeOther[@name="button-Active"]',
      '//XCUIElementTypeStaticText[@name="Active"]'
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
    try {
      await this.tapFirstVisible(FormsPage.dropdownOptionSelectors, 5000)
    } catch {
      // Suporte para PickerWheel nativo do iOS se o modal de rodinha for exibido
      const isIOS = driver.isIOS || browser.isIOS || String(driver.capabilities?.platformName || '').toLowerCase() === 'ios'
      if (isIOS) {
        const picker = await $('//XCUIElementTypePickerWheel')
        if (await picker.isDisplayed().catch(() => false)) {
          await picker.selectByAttribute('value', 'webdriver.io is awesome').catch(() => {})
          const doneButton = await $('-ios predicate string:label == "Done" OR name == "Done"')
          if (await doneButton.isDisplayed().catch(() => false)) {
            await doneButton.click()
          }
        }
      }
    }
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
