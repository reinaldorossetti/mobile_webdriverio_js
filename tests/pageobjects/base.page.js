import allureReporter from '@wdio/allure-reporter'
import fs from 'node:fs/promises'
import path from 'node:path'

class BasePage {
  static appPackage = 'com.wdiodemoapp'

  isInstrumentationFailure(error) {
    return /instrumentation process is not running|cannot be proxied to UiAutomator2 server/i.test(
      error?.message || String(error)
    )
  }

  async waitForScreen(selectors, timeout = 15000) {
    await this.findFirstVisible(selectors, timeout)
  }

  async takeEvidence(name = 'evidence') {
    const safeName = name.replace(/[^a-zA-Z0-9-_]/g, '_')
    const timestamp = Date.now()
    const fileName = `${timestamp}-${safeName}.png`
    const screenshotsDir = path.resolve('./reports/screenshots')
    const filePath = path.join(screenshotsDir, fileName)

    const screenshotBase64 = await browser.takeScreenshot()
    await fs.mkdir(screenshotsDir, { recursive: true })
    await fs.writeFile(filePath, screenshotBase64, 'base64')

    allureReporter.addAttachment(
      `Screenshot - ${safeName}`,
      Buffer.from(screenshotBase64, 'base64'),
      'image/png'
    )
  }

  async findFirstVisible(selectors, timeout = 15000) {
    let foundElement

    await browser.waitUntil(async () => {
      try {
        for (const selector of selectors) {
          const element = await $(selector)
          if (await element.isDisplayed()) {
            foundElement = element
            return true
          }
        }

        return false
      } catch (error) {
        if (this.isInstrumentationFailure(error)) {
          throw error
        }

        return false
      }
    }, {
      timeout,
      interval: 500,
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
      try {
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
      } catch (error) {
        if (this.isInstrumentationFailure(error)) {
          throw error
        }

        return false
      }
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
