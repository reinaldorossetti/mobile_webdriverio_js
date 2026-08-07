import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { sharedConfig } from './wdio.shared.conf.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const config = {
  ...sharedConfig,
  maxInstances: 1,
  maxInstancesPerCapability: 1,
  port: 4723,
  services: [
    ['appium', {
      logPath: path.resolve(__dirname, '../logs')
    }]
  ],
  reporters: [
    'spec',
    ['allure', {
      outputDir: path.resolve(__dirname, '../reports/allure-results-android'),
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      addConsoleLogs: true,
      reportedEnvironmentVars: {
        TEST_ENV: process.env.TEST_ENV || 'local',
        PLATFORM: 'Android'
      }
    }]
  ],
  capabilities: [{
    'wdio:maxInstances': 1,
    platformName: 'Android',
    'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
    'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '14.0',
    ...(process.env.ANDROID_UDID ? { 'appium:udid': process.env.ANDROID_UDID } : {}),
    'appium:automationName': 'UiAutomator2',
    'appium:app': path.resolve(__dirname, '../app/android/android.wdio.native.app.v2.2.0.apk'),
    'appium:autoGrantPermissions': true,
    'appium:forceAppLaunch': true,
    'appium:shouldTerminateApp': true,
    'appium:newCommandTimeout': 180
  }]
}
