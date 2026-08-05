import LoginPage from '../pageobjects/login.page.js'
import SignupPage from '../pageobjects/signup.page.js'
import usersData from '../data/users.json' with { type: 'json' }

describe('Autenticação (Login/Cadastro)', () => {
  const uniqueSuffix = Date.now()
  const signupUser = {
    ...usersData.signupUsers[0],
    email: `qa+${uniqueSuffix}@example.com`
  }

  beforeEach(async () => {
    await driver.activateApp('com.wdiodemoapp')
  })

  it('C01 - Deve realizar login com credenciais válidas', async () => {
    // Pré-condição solicitada: primeiro cadastra, depois faz login
    await SignupPage.openSignup()
    await SignupPage.assertOnSignupTab()
    await SignupPage.registerUser(signupUser)

    // Valida transição da aba Sign up -> Login
    await SignupPage.switchToLoginTab()
    await LoginPage.assertOnLoginTab()

    await LoginPage.loginWith(signupUser.email, signupUser.password)
    await LoginPage.assertLoginSuccess()
  })

  it('C02 - Deve exibir erro ao logar com credenciais inválidas', async () => {
    const invalidUser = usersData.invalidUsers[0]

    await LoginPage.openLogin()
    await LoginPage.loginWith(invalidUser.username, invalidUser.password)
    await LoginPage.assertLoginError(invalidUser.expectedError)
  })

  it('C03 - Deve cadastrar novo usuário com dados válidos', async () => {
    const user = {
      ...usersData.signupUsers[0],
      email: `qa.signup.${Date.now()}@example.com`
    }

    await SignupPage.openSignup()
    await SignupPage.assertOnSignupTab()
    await SignupPage.registerUser(user)
  })

  it('C04 - Deve exibir erro ao cadastrar com campos obrigatórios vazios', async () => {
    await SignupPage.openSignup()
    await SignupPage.assertOnSignupTab()
    await SignupPage.fillSignupForm({
      email: '',
      password: ''
    })
    await SignupPage.submitSignup()
    await SignupPage.assertSignupError('please enter')
  })
})
