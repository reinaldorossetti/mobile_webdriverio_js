import allureReporter from '@wdio/allure-reporter'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const sharedConfig = {
  runner: 'local',
  specs: [path.resolve(__dirname, '../tests/specs/**/*.spec.js')],
  maxInstances: 1,
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000
  },

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
        const screenshotBase64 = await browser.takeScreenshot()
        allureReporter.addAttachment(
          `Failure - ${test.title}`,
          Buffer.from(screenshotBase64, 'base64'),
          'image/png'
        )
      } catch {
        // sessão pode já ter sido encerrada pelo Appium; evita mascarar erro original do teste
      }
    }
  }
}
