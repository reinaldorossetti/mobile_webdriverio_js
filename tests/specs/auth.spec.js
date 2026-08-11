import LoginPage from '../pageobjects/login.page.js'
import SignupPage from '../pageobjects/signup.page.js'
import usersData from '../data/users.json' with { type: 'json' }
import allureReporter from '@wdio/allure-reporter'

describe('Autenticação (Login/Cadastro)', () => {
  const uniqueSuffix = Date.now()
  const signupUser = {
    ...usersData.signupUsers[0],
    email: `qa+${uniqueSuffix}@example.com`
  }

  beforeEach(async () => {
    const bundleId = browser.isIOS 
        ? 'org.reactjs.native.example.wdiodemoapp' 
        : 'com.wdiodemoapp';
    await driver.reloadSession()
    await driver.activateApp(bundleId)
  })

  afterEach(async () => {
    const bundleId = browser.isIOS
        ? 'org.reactjs.native.example.wdiodemoapp' 
        : 'com.wdiodemoapp';
    await driver.terminateApp(bundleId).catch(() => {})
  })

  it('C01 - Deve realizar login com credenciais válidas', async () => {
    allureReporter.addStep('Pré-condição: cadastrar um novo usuário')
    await SignupPage.openSignup()
    await SignupPage.assertOnSignupTab()
    await SignupPage.fillSignupForm(signupUser)
    await SignupPage.submitSignup()
    await SignupPage.assertNativeModalContains(['Signed Up!', 'You successfully signed up!'])

    allureReporter.addStep('Validar transição da aba Sign up para Login')
    await SignupPage.switchToLoginTab()
    await LoginPage.assertOnLoginTab()

    allureReporter.addStep('Realizar login com as credenciais cadastradas')
    await LoginPage.loginWith(signupUser.email, signupUser.password)
    
    allureReporter.addStep('Validar login realizado com sucesso')
    await LoginPage.assertNativeModalContains(['Success', 'You are logged in!'])
  })

  it('C02 - Deve exibir erro ao logar com credenciais inválidas', async () => {
    const invalidUser = usersData.invalidUsers[0]

    allureReporter.addStep('Acessar a tela de Login')
    await LoginPage.openLogin()
    
    allureReporter.addStep('Tentar login com credenciais inválidas')
    await LoginPage.loginWith(invalidUser.username, invalidUser.password)
    
    allureReporter.addStep('Validar mensagem de erro do login')
    await LoginPage.assertNativeModalContains('Please enter a valid email address')
  })

  it('C03 - Deve cadastrar novo usuário com dados válidos', async () => {
    const user = {
      ...usersData.signupUsers[0],
      email: `qa.signup.${Date.now()}@example.com`
    }

    allureReporter.addStep('Acessar a tela de cadastro')
    await SignupPage.openSignup()
    await SignupPage.assertOnSignupTab()
    
    allureReporter.addStep('Cadastrar novo usuário com dados válidos')
    await SignupPage.fillSignupForm(user)
    await SignupPage.submitSignup()
    
    await SignupPage.assertNativeModalContains(['Signed Up!', 'You successfully signed up!'])
  })

  it('C04 - Deve exibir erro ao cadastrar com campos obrigatórios vazios', async () => {
    allureReporter.addStep('Acessar a tela de cadastro')
    await SignupPage.openSignup()
    await SignupPage.assertOnSignupTab()
    
    allureReporter.addStep('Enviar cadastro sem preencher os campos obrigatórios')
    await SignupPage.fillSignupForm({
      email: '',
      password: ''
    })
    await SignupPage.submitSignup()
    
    allureReporter.addStep('Validar mensagens de erro dos campos obrigatórios')
    await SignupPage.assertNativeModalContains('Please enter a valid email address')
    await SignupPage.assertNativeModalContains('Please enter at least 8 characters')
    await SignupPage.assertNativeModalContains('Please enter the same password')
  })
})
