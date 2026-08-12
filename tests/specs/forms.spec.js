import SignupPage from '../pageobjects/signup.page.js'
import FormsPage from '../pageobjects/forms.page.js'
import usersData from '../data/users.json' with { type: 'json' }
import allureReporter from '@wdio/allure-reporter'

describe('Formulários e mensagens de erro', () => {

  beforeEach(async () => {
    const bundleId = browser.isIOS
      ? 'org.reactjs.native.example.wdiodemoapp'
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

  it('C08 - Deve preencher e enviar formulário com dados válidos', async () => {
    const formDataText = usersData.formData?.valid?.text

    allureReporter.addStep('Acessar a tela de Formulários')
    await FormsPage.openForms()

    allureReporter.addStep('Selecionar webdriver.io is awesome no Dropdown')
    await FormsPage.selectDropdownOption()

    allureReporter.addStep('Preencher o campo de texto com dados válidos e Envia')
    await FormsPage.fillTextInput(formDataText)
    await FormsPage.submitForm()

    allureReporter.addStep('Validar e fechar o feedback do botão ativo')
    await FormsPage.assertNativeModalContains('This button is active')

    allureReporter.addStep('Validar o texto enviado no resultado')
    await expect(await $(FormsPage.constructor.textInputResultSelectors[0])).toHaveText(formDataText);
  })

  it('C09 - Deve exibir erro para e-mail inválido', async () => {
    const invalidSignup = usersData.signupInvalidEmail

    allureReporter.addStep('Acessar a tela de cadastro')
    await SignupPage.openSignup()
    await SignupPage.assertOnSignupTab()

    allureReporter.addStep('Preencher o cadastro com e-mail inválido')
    await SignupPage.fillSignupForm(invalidSignup)
    await SignupPage.submitSignup()

    allureReporter.addStep('Validar mensagem de erro do e-mail inválido')
    await SignupPage.assertNativeModalContains('Please enter a valid email address')
  })

  it('C10 - Deve exibir erro para campos obrigatórios não preenchidos', async () => {
    allureReporter.addStep('Acessar a tela de cadastro')
    await SignupPage.openSignup()
    await SignupPage.assertOnSignupTab()

    allureReporter.addStep('Enviar cadastro sem preencher os campos obrigatórios')
    await SignupPage.submitSignup()

    allureReporter.addStep('Validar mensagem de erro dos campos obrigatórios')
    await SignupPage.assertNativeModalContains('Please enter a valid email address')
  })
})
