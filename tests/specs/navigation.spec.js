import HomePage from '../pageobjects/home.page.js'
import LoginPage from '../pageobjects/login.page.js'
import FormsPage from '../pageobjects/forms.page.js'
import NavigationPage from '../pageobjects/navigation.page.js'

describe('Navegação entre telas', () => {
  beforeEach(async () => {
    await driver.terminateApp('com.wdiodemoapp').catch(() => {})
    await driver.activateApp('com.wdiodemoapp')
  })

  afterEach(async () => {
    await driver.terminateApp('com.wdiodemoapp').catch(() => {})
  })

  it('C05 - Deve navegar da Home para Login', async () => {
    await HomePage.openHome()
    await NavigationPage.goToLogin()
    await LoginPage.assertOnLoginTab()
  })

  it('C06 - Deve navegar da Home para Formulários', async () => {
    await HomePage.openHome()
    await NavigationPage.goToForms()
    await FormsPage.assertOnFormsScreen()
  })

  it('C07 - Deve retornar para Home a partir de tela interna', async () => {
    await NavigationPage.goToForms()
    await FormsPage.assertOnFormsScreen()

    await NavigationPage.goToHome()
    await HomePage.assertOnHomeScreen()
  })
})
