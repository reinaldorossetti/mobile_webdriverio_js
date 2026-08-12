import allureReporter from '@wdio/allure-reporter'
import fs from 'node:fs/promises'
import path from 'node:path'

class BasePage {
  static get appPackage() {
    const platformName = String(driver.capabilities?.platformName || '').toLowerCase()
    return (driver.isIOS || platformName === 'ios')
      ? 'org.wdiodemoapp'
      : 'com.wdiodemoapp'
  }
  static timeout = 20000

  /**
   * Verifica se o erro indica que o processo de instrumentação do Appium falhou.
   * @param {Error|string} error Erro retornado pelo WebDriver ou Appium.
   * @returns {boolean} `true` quando o erro indica falha de instrumentação.
   */
  isInstrumentationFailure(error) {
    return /instrumentation process is not running|cannot be proxied to UiAutomator2 server/i.test(
      error?.message || String(error)
    )
  }

  /**
   * Aguarda até que pelo menos um seletor corresponda a um elemento visível.
   * @param {string[]} selectors Lista de seletores candidatos.
   * @param {number} [timeout=15000] Tempo máximo de espera em milissegundos.
   * @returns {Promise<void>} Promise concluída quando um elemento é encontrado.
   */
  async waitForScreen(selectors, timeout = BasePage.timeout) {
    await this.findFirstVisible(selectors, timeout)
  }

  /**
   * Captura uma evidência da tela e a anexa ao relatório Allure.
   * @param {string} [name='evidence'] Nome usado no arquivo e no anexo.
   * @returns {Promise<void>} Promise concluída após salvar a imagem.
   */
  async takeEvidence(name = 'evidence') {
    const safeName = name.replace(/[^a-zA-Z0-9-_]/g, '_')
    const timestamp = Date.now()
    const fileName = `${timestamp}-${safeName}.png`
    const screenshotsDir = path.resolve('./reports/screenshots')
    const filePath = path.join(screenshotsDir, fileName)

    const activeDriver = globalThis.driver || globalThis.browser
    const screenshotBase64 = await activeDriver.takeScreenshot()
    await fs.mkdir(screenshotsDir, { recursive: true })
    await fs.writeFile(filePath, screenshotBase64, 'base64')

    allureReporter.addAttachment(
      `Screenshot - ${safeName}`,
      Buffer.from(screenshotBase64, 'base64'),
      'image/png'
    )
  }

  /**
   * Captura o código-fonte XML dos elementos da tela (Page Source) e o anexa ao relatório Allure.
   * @param {string} [name='page-source'] Nome usado no arquivo e no anexo.
   * @returns {Promise<string>} Caminho do arquivo XML salvo.
   */
  async savePageSourceXml(name = 'page-source') {
    const safeName = name.replace(/[^a-zA-Z0-9-_]/g, '_')
    const timestamp = Date.now()
    const fileName = `${timestamp}-${safeName}.xml`
    const xmlDir = path.resolve('./reports/page-sources')
    const filePath = path.join(xmlDir, fileName)

    const activeDriver = globalThis.driver || globalThis.browser
    const pageSource = await activeDriver.getPageSource()
    await fs.mkdir(xmlDir, { recursive: true })
    await fs.writeFile(filePath, pageSource, 'utf-8')

    allureReporter.addAttachment(
      `Page Source XML - ${safeName}`,
      pageSource,
      'application/xml'
    )

    return filePath
  }


  /**
   * Obtém dinamicamente a lista de seletores apropriada para a plataforma atual (iOS vs Android).
   * @param {string[]|{ios?: string[], android?: string[]}} selectors Objeto { ios: [], android: [] } ou Array de seletores.
   * @returns {string[]} Lista de seletores para a plataforma atual.
   */
  getSelectors(selectors) {
    if (!selectors) return []
    if (Array.isArray(selectors)) return selectors

    const isIOS = driver.isIOS || browser.isIOS || String(driver.capabilities?.platformName || '').toLowerCase() === 'ios'
    return isIOS
      ? (selectors.ios || selectors.default || [])
      : (selectors.android || selectors.default || [])
  }

  /**
   * Localiza o primeiro elemento visível entre os seletores informados.
   * @param {string[]|{ios?: string[], android?: string[]}} selectors Lista ou objeto de seletores candidatos.
   * @param {number} [timeout=15000] Tempo máximo de espera em milissegundos.
   * @returns {Promise<WebdriverIO.Element>} Primeiro elemento visível encontrado.
   */
  async findFirstVisible(selectors, timeout = BasePage.timeout) {
    const selectorList = this.getSelectors(selectors)
    let foundElement

    await browser.waitUntil(async () => {
      try {
        for (const selector of selectorList) {
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
      timeoutMsg: `Nenhum elemento visível encontrado para os seletores: ${selectorList.join(', ')}`
    })

    return foundElement
  }

  /**
   * Toca no primeiro elemento visível entre os seletores informados.
   * @param {string[]} selectors Lista de seletores candidatos.
   * @param {number} [timeout=15000] Tempo máximo de espera em milissegundos.
   * @returns {Promise<void>} Promise concluída após o clique.
   */
  async tapFirstVisible(selectors, timeout = BasePage.timeout) {
    const element = await this.findFirstVisible(selectors, timeout)
    await element.click()
  }

  /**
   * Define um valor no primeiro campo visível entre os seletores informados.
   * @param {string[]} selectors Lista de seletores candidatos.
   * @param {string} value Valor a ser preenchido.
   * @param {number} [timeout=15000] Tempo máximo de espera em milissegundos.
   * @returns {Promise<void>} Promise concluída após preencher o campo.
   */
  async setValue(selectors, value, timeout = BasePage.timeout) {
    const element = await this.findFirstVisible(selectors, timeout)
    await element.setValue(value)
  }

  /**
   * Garante que o aplicativo esteja ativo e em primeiro plano.
   * @returns {Promise<void>} Promise concluída após ativar o aplicativo, quando suportado.
   */
  async ensureAppInForeground() {
    if (typeof driver.activateApp === 'function') {
      await driver.activateApp(BasePage.appPackage)
    }
  }

  /**
   * Cria um seletor nativo por texto para a plataforma em execução.
   * @param {string} text Texto exibido pelo elemento nativo.
   * @returns {string} Seletor compatível com Android ou iOS.
   */
  getNativeTextSelector(text) {
    const escapedText = text.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
    const platformName = String(driver.capabilities?.platformName || '').toLowerCase()

    if (driver.isAndroid || platformName === 'android') {
      return `-android uiautomator:new UiSelector().text("${escapedText}")`
    }

    if (driver.isIOS || platformName === 'ios') {
      return `-ios predicate string:label == "${escapedText}" OR name == "${escapedText}" OR value == "${escapedText}"`
    }

    throw new Error(`Plataforma não suportada para seletor nativo: ${platformName || 'desconhecida'}`)
  }

  /**
   * Valida textos de um modal nativo usando o elemento da plataforma e fecha o modal.
   * @param {string|string[]} expectedTexts Texto ou textos esperados no modal.
   * @param {number} [timeout=10000] Tempo máximo de espera em milissegundos.
   * @returns {Promise<void>} Promise concluída após validar o feedback.
   */
  async assertNativeModalContains(expectedTexts, timeout = 10000) {
    const texts = Array.isArray(expectedTexts) ? expectedTexts : [expectedTexts]

    for (const text of texts) {
      const selector = this.getNativeTextSelector(text)
      await browser.waitUntil(async () => {
        const element = await driver.$(selector)
        return element.isDisplayed()
      }, {
        timeout,
        interval: 250,
        timeoutMsg: `Modal não exibiu o elemento com o texto esperado: ${text}`
      })

      const element = await driver.$(selector)
      await expect(element).toBeDisplayed()
    }

    const okButton = await driver.$(this.getNativeTextSelector('OK'))
    if (await okButton.isDisplayed().catch(() => false)) {
      await okButton.click()
    }
  }

  /**
   * Aguarda a exibição do botão OK de um modal de feedback.
   * @param {number} [timeout=10000] Tempo máximo de espera em milissegundos.
   * @returns {Promise<void>} Promise concluída quando o botão é exibido.
   */
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

  /**
   * Obtém o código-fonte do modal de feedback e fecha o modal.
   * @param {number} [timeout=10000] Tempo máximo de espera em milissegundos.
   * @returns {Promise<string>} Código-fonte da tela em letras minúsculas.
   */
  async getModalTextAndClose(timeout = 10000) {
    await this.waitForModalOkButton(timeout)
    const source = (await browser.getPageSource()).toLowerCase()
    const okButton = await $('//*[@text="OK"]')
    await okButton.click()
    return source
  }

  /**
   * Aguarda um feedback esperado, captura sua fonte e fecha o modal quando possível.
   * @param {string[]} [expectedFragments=[]] Fragmentos esperados na fonte da tela.
   * @param {number} [timeout=10000] Tempo máximo de espera em milissegundos.
   * @returns {Promise<string>} Código-fonte capturado em letras minúsculas.
   */
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
