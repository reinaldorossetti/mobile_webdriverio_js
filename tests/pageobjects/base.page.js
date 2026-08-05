class BasePage {
  static appPackage = 'com.wdiodemoapp'

  async waitForScreen(selectors, timeout = 15000) {
    await this.findFirstVisible(selectors, timeout)
  }

  async takeEvidence(name = 'evidence') {
    const safeName = name.replace(/[^a-zA-Z0-9-_]/g, '_')
    await browser.saveScreenshot(`./reports/screenshots/${Date.now()}-${safeName}.png`)
  }

  async findFirstVisible(selectors, timeout = 15000) {
    let foundElement

    await browser.waitUntil(async () => {
      for (const selector of selectors) {
        const element = await $(selector)
        if (await element.isDisplayed()) {
          foundElement = element
          return true
        }
      }

      return false
    }, {
      timeout,
      interval: 300,
      timeoutMsg: `Nenhum elemento visível encontrado para os seletores: ${selectors.join(', ')}`
    })

    return foundElement
  }

  async tapFirstVisible(selectors, timeout = 15000) {
    const element = await this.findFirstVisible(selectors, timeout)
    await element.click()
  }

  async setValueFirstVisible(selectors, value, timeout = 15000) {
    const element = await this.findFirstVisible(selectors, timeout)
    await element.setValue(value)
  }

  async ensureAppInForeground() {
    if (typeof driver.activateApp === 'function') {
      await driver.activateApp(BasePage.appPackage)
    }
  }

  async waitForModalOkButton(timeout = 10000) {
    await browser.waitUntil(async () => {
      const okButton = await $('//*[@text="OK"]')
      return okButton.isDisplayed()
    }, {
      timeout,
      interval: 250,
      timeoutMsg: 'Modal de feedback (botão OK) não foi exibido no tempo esperado'
    })
  }

  async getModalTextAndClose(timeout = 10000) {
    await this.waitForModalOkButton(timeout)
    const source = (await browser.getPageSource()).toLowerCase()
    const okButton = await $('//*[@text="OK"]')
    await okButton.click()
    return source
  }

  async captureFeedbackSource(expectedFragments = [], timeout = 10000) {
    let source = ''
    let hasOkButton = false

    await browser.waitUntil(async () => {
      source = (await browser.getPageSource()).toLowerCase()
      const okButton = await $('//*[@text="OK"]')
      hasOkButton = await okButton.isDisplayed()

      if (hasOkButton) {
        return true
      }

      if (!expectedFragments.length) {
        return false
      }

      return expectedFragments.some((fragment) => source.includes(fragment.toLowerCase()))
    }, {
      timeout,
      interval: 300,
      timeoutMsg: `Nenhum feedback esperado foi encontrado (${expectedFragments.join(', ')})`
    })

    if (hasOkButton) {
      const okButton = await $('//*[@text="OK"]')
      await okButton.click()
    }

    return source
  }
}

export default BasePage
