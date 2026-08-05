import SignupPage from '../pageobjects/signup.page.js'
import FormsPage from '../pageobjects/forms.page.js'
import usersData from '../data/users.json' with { type: 'json' }

describe('Formulários e mensagens de erro', () => {
  beforeEach(async () => {
    await driver.terminateApp('com.wdiodemoapp').catch(() => {})
    await driver.activateApp('com.wdiodemoapp')
  })

  afterEach(async () => {
    await driver.terminateApp('com.wdiodemoapp').catch(() => {})
  })

  it('C08 - Deve preencher e enviar formulário com dados válidos', async () => {
    const formData = usersData.formData?.valid?.text || `Mensagem QA ${Date.now()}`

    await FormsPage.openForms()
    await FormsPage.fillTextInput(formData)
    await FormsPage.submitForm()
    await FormsPage.assertTextResultContains(formData)
  })

  it('C09 - Deve exibir erro para e-mail inválido', async () => {
    const invalidSignup = usersData.signupInvalidEmail

    await SignupPage.openSignup()
    await SignupPage.assertOnSignupTab()
    await SignupPage.fillSignupForm(invalidSignup)
    await SignupPage.submitSignup()
    await SignupPage.assertSignupError(invalidSignup.expectedError)
  })

  it('C10 - Deve exibir erro para campos obrigatórios não preenchidos', async () => {
    const requiredFieldError = usersData.signupRequiredFields

    await SignupPage.openSignup()
    await SignupPage.assertOnSignupTab()
    await SignupPage.fillSignupForm(requiredFieldError)
    await SignupPage.submitSignup()
    await SignupPage.assertSignupError(requiredFieldError.expectedError)
  })
})
