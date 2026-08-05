import { sharedConfig } from './wdio.shared.conf.js'

export const config = {
  ...sharedConfig,
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  services: [
    ['browserstack', {
      testReporting: true,
      browserstackLocal: false,
      app: process.env.BROWSERSTACK_APP_URL
    }]
  ],
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:app': process.env.BROWSERSTACK_APP_URL,
    'bstack:options': {
      deviceName: process.env.BSTACK_DEVICE_NAME || 'Google Pixel 8',
      osVersion: process.env.BSTACK_OS_VERSION || '14.0',
      projectName: 'mobile_webdriverio_js',
      buildName: process.env.BSTACK_BUILD_NAME || 'Regression Build',
      sessionName: 'WDIO Native Demo App'
    }
  }]
}
