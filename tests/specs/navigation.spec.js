import HomePage from '../pageobjects/home.page.js'
import LoginPage from '../pageobjects/login.page.js'
import FormsPage from '../pageobjects/forms.page.js'
import NavigationPage from '../pageobjects/navigation.page.js'
import allureReporter from '@wdio/allure-reporter'

describe('Navegação entre telas', () => {
  beforeEach(async () => {
    const bundleId = browser.isIOS
      ? 'org.wdiodemoapp'
      : 'com.wdiodemoapp';

    if (!browser.isIOS) {
      await driver.reloadSession()
    }
    await driver.activateApp(bundleId)
  })

  afterEach(async () => {
    const bundleId = browser.isIOS
      ? 'org.wdiodemoapp'
      : 'com.wdiodemoapp';
    await FormsPage.takeEvidence('FormsPage-AfterEach')
    await driver.terminateApp(bundleId).catch(() => { })
  })

  it('C05 - Deve navegar da Home para Login', async () => {
    allureReporter.addStep('Acessar a tela Home')
    await HomePage.openHome()

    allureReporter.addStep('Navegar da Home para Login')
    await NavigationPage.goToLogin()

    allureReporter.addStep('Validar que a tela de Login foi exibida')
    await LoginPage.assertOnLoginTab()
  })

  it('C06 - Deve navegar da Home para Formulários', async () => {
    allureReporter.addStep('Acessar a tela Home')
    await HomePage.openHome()

    allureReporter.addStep('Navegar da Home para Formulários')
    await NavigationPage.goToForms()

    allureReporter.addStep('Validar que a tela de Formulários foi exibida')
    await FormsPage.assertOnFormsScreen()
  })

  it('C07 - Deve retornar para Home a partir de tela interna', async () => {
    allureReporter.addStep('Acessar a tela de Formulários')
    await NavigationPage.goToForms()
    await FormsPage.assertOnFormsScreen()

    allureReporter.addStep('Retornar da tela de Formulários para Home')
    await NavigationPage.goToHome()

    allureReporter.addStep('Validar que a tela Home foi exibida')
    await HomePage.assertOnHomeScreen()
  })
})
