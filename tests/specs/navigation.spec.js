import HomePage from '../pageobjects/home.page.js'
import LoginPage from '../pageobjects/login.page.js'
import FormsPage from '../pageobjects/forms.page.js'
import NavigationPage from '../pageobjects/navigation.page.js'
import allureReporter from '@wdio/allure-reporter'

describe('Navegação entre telas', () => {
  beforeEach(async () => {
    await driver.reloadSession()
    await driver.activateApp('com.wdiodemoapp')
  })

  afterEach(async () => {
    await LoginPage.takeEvidence('LoginPage-AfterEach')
    await driver.terminateApp('com.wdiodemoapp').catch(() => {})
  })

  it('C05 - Deve navegar da Home para Login', async () => {
    allureReporter.addStep('Acessar a tela Home')
    await HomePage.openHome()
    
    allureReporter.addStep('Navegar da Home para Login')
    await NavigationPage.goToLogin()
    
    allureReporter.addStep('Validar que a tela de Login foi exibida')
    await expect(await $(LoginPage.constructor.loginButtonSelectors[0])).toBeDisplayed()
  })

  it('C06 - Deve navegar da Home para Formulários', async () => {
    allureReporter.addStep('Acessar a tela Home')
    await HomePage.openHome()
    
    allureReporter.addStep('Navegar da Home para Formulários')
    await NavigationPage.goToForms()
    
    allureReporter.addStep('Validar que a tela de Formulários foi exibida')
    await expect(await $(FormsPage.constructor.formsScreenSelectors[0])).toBeDisplayed()
  })

  it('C07 - Deve retornar para Home a partir de tela interna', async () => {
    allureReporter.addStep('Acessar a tela de Formulários')
    await NavigationPage.goToForms()
    await FormsPage.assertOnFormsScreen()

    allureReporter.addStep('Retornar da tela de Formulários para Home')
    await NavigationPage.goToHome()
    
    allureReporter.addStep('Validar que a tela Home foi exibida')
    await expect(await $(HomePage.constructor.homeScreenSelectors[0])).toBeDisplayed()
  })
})
