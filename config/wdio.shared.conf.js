import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import dotenv from 'dotenv'
import { captureFailureScreenshot, captureFailureXml } from '../tests/helpers/screenshot.helper.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const sharedConfig = {
  runner: 'local',
  specs: [path.join(__dirname, '../tests/specs/*.spec.js')],
  maxInstances: 1,

  // Opções: 'trace', 'debug', 'info', 'warn', 'error', 'silent'
  logLevel: 'debug',
  bail: 0,
  waitforTimeout: 15000,
  connectionRetryTimeout: 180000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 180000
  },

  // Salvar logs em um arquivo de saída
  outputDir: path.resolve(__dirname, '../logs'),

  reporters: [
    'spec',
    ['allure', {
      outputDir: path.resolve(__dirname, '../reports/allure-results'),
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      addConsoleLogs: true,
      reportedEnvironmentVars: {
        TEST_ENV: process.env.TEST_ENV || 'local'
      }
    }]
  ],

  afterTest: async function (test, _context, { error }) {
    if (error) {
      try {
        await captureFailureScreenshot(test.title)
        await captureFailureXml(test.title)
      } catch {
        // sessão pode já ter sido encerrada; evita mascarar o erro original do teste
      }
    }
  }
}
