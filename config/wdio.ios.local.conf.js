import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { sharedConfig } from './wdio.shared.conf.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const config = {
  ...sharedConfig,
  port: 4723,
  maxInstances: 1,
  maxInstancesPerCapability: 1,
  services: [
    ['appium', {
      logPath: path.resolve(__dirname, '../logs')
    }]
  ],
  reporters: [
    'spec',
    ['allure', {
      outputDir: path.resolve(__dirname, '../reports/allure-results-ios'),
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      addConsoleLogs: true,
      reportedEnvironmentVars: {
        TEST_ENV: process.env.TEST_ENV || 'local',
        PLATFORM: 'iOS'
      }
    }]
  ],
  capabilities: [{
    platformName: 'iOS',
    'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 15',
    'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '17.5',
    'appium:automationName': 'XCUITest',
    'appium:app': path.resolve(__dirname, '../app/ios/wdiodemoapp.app'),
    'appium:wdaLaunchTimeout': 180000,     // Tempo limite para o WebDriverAgent iniciar (3 min)
    'appium:wdaConnectionTimeout': 180000, // Tempo limite de conexão com o WDA
    'appium:commandTimeouts': '120000',    // Tempo limite para comandos gerais
    'appium:noReset': true, // Não redefinir o estado do aplicativo entre os testes
    'appium:fullReset': false,
    'appium:autoAcceptAlerts': false,
  }]
}
