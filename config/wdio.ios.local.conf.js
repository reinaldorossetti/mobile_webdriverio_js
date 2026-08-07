import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { sharedConfig } from './wdio.shared.conf.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const config = {
  ...sharedConfig,
  port: 4723,
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
    'appium:app': path.resolve(__dirname, '../app/ios/ios.simulator.wdio.native.app.v2.2.0.zip'),
    'appium:newCommandTimeout': 180
  }]
}
