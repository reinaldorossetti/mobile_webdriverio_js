import fs from 'node:fs/promises'
import path from 'node:path'
import allureReporter from '@wdio/allure-reporter'

/**
 * Captura a tela da sessão ainda ativa, salva o arquivo e anexa a imagem ao Allure.
 * Este helper deve ser chamado no hook `afterTest`, antes do `afterEach` encerrar o app.
 *
 * @param {string} scenarioName Nome do cenário usado no arquivo e no anexo.
 * @returns {Promise<string>} Caminho absoluto do screenshot salvo.
 */
export async function captureFailureScreenshot(scenarioName) {
  const safeName = scenarioName.replace(/[^a-zA-Z0-9-_]/g, '_')
  const screenshotBase64 = await browser.takeScreenshot()
  const screenshotsDir = path.resolve('./reports/screenshots')
  const screenshotPath = path.join(
    screenshotsDir,
    `${Date.now()}-${safeName}.png`
  )

  await fs.mkdir(screenshotsDir, { recursive: true })
  await fs.writeFile(screenshotPath, screenshotBase64, 'base64')

  allureReporter.addAttachment(
    `Failure - ${scenarioName}`,
    Buffer.from(screenshotBase64, 'base64'),
    'image/png'
  )

  return screenshotPath
}
