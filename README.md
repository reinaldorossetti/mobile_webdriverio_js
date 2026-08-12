# 📱 mobile_webdriverio_js

Projeto e arquitetura para automação de testes mobile com **WebdriverIO + Appium + Mocha + Chai**, seguindo as diretrizes e requisitos definidos em [`Requisitos.md`](./Requisitos.md).

---

## 🚀 Integração Contínua (CI/CD) e Relatórios

Os testes são executados automaticamente via **GitHub Actions** em emuladores Android e simuladores iOS:
- 🤖 **Android Integration Workflow:** [`.github/workflows/mobile-integration-tests.yml`](./.github/workflows/mobile-integration-tests.yml)
- 🍏 **iOS Integration Workflow:** [`.github/workflows/ios-integration-tests.yml`](./.github/workflows/ios-integration-tests.yml)
- ☁️ **BrowserStack Workflow (Opcional):** [`.github/workflows/browserstack-tests.yml`](./.github/workflows/browserstack-tests.yml)

### 📊 Relatórios Online (GitHub Pages):
- 🤖 **Android Allure Report:** [https://reinaldorossetti.github.io/mobile_webdriverio_js/allure-report-android/](https://reinaldorossetti.github.io/mobile_webdriverio_js/allure-report-android/)
- 🍏 **iOS Allure Report:** [https://reinaldorossetti.github.io/mobile_webdriverio_js/allure-report-ios/](https://reinaldorossetti.github.io/mobile_webdriverio_js/allure-report-ios/)

---

## 📈 Métricas de Execução e Cobertura

| Plataforma | Total de Testes | Sucesso (Passed) | Falhos / Quebrados | Taxa de Sucesso | Status |
| :--- | :---: | :---: | :---: | :---: | :---: |
| 🤖 **Android** | 10 | 10 | 0 | **100%** | ✅ Pass |
| 🍏 **iOS** | 10 | 8 | 2 | **80%** | ⚠️ Warning |
| 🌐 **Total Geral** | **20** | **18** | **2** | **90%** | 🚀 **90% Sucesso** |

### 📊 Detalhamento por Suíte de Teste:

#### 🤖 Android (10 Casos de Teste - 100% Sucesso)
- 🟢 **Autenticação (Login/Cadastro):** 4 de 4 executados com sucesso
- 🟢 **Formulários e mensagens de erro:** 3 de 3 executados com sucesso
- 🟢 **Navegação entre telas:** 3 de 3 executados com sucesso

#### 🍏 iOS (10 Casos de Teste - 80% Sucesso)
- 🟡 **Autenticação (Login/Cadastro):** 3 de 4 executados com sucesso (1 falha/ajuste)
- 🟡 **Formulários e mensagens de erro:** 2 de 3 executados com sucesso (1 falha/ajuste)
- 🟢 **Navegação entre telas:** 3 de 3 executados com sucesso

---

## ⚡ Quick Start (Execução Rápida)

Após clonar o repositório, instale as dependências e execute os testes:

```bash
# 📦 1. Instalar dependências
npm install

# 🤖 2. Executar suíte no Android
npm run test:android

# 🍏 3. Executar suíte no iOS (somente macOS)
npm run test:ios
```

---

## 🎯 Objetivo

Estruturar e automatizar os cenários de teste para o aplicativo nativo de demonstração em ambas as plataformas:
- 🤖 **Android APK:** `app/android/android.wdio.native.app.v2.2.0.apk`
- 🍏 **iOS App (Simulador):** `app/ios/wdiodemoapp.app` (Bundle ID: `org.wdiodemoapp`)

---

## 🛠️ Stack Tecnológica

- 🔤 **Linguagem:** JavaScript (ESM - ES Modules)
- 🤖 **Framework de Automação:** [WebdriverIO](https://webdriver.io/)
- 📱 **Driver Mobile:** [Appium](https://appium.io/) (`UiAutomator2` / `XCUITest`)
- 🧪 **Runner de Testes:** [Mocha](https://mochajs.org/)
- 🎯 **Assertions:** [Chai](https://www.chaijs.com/)
- 📊 **Relatórios:** Allure Report
- ⚙️ **CI/CD Pipeline:** GitHub Actions
- ☁️ **Nuvem de Dispositivos:** BrowserStack (suporte integrado)

---

## 📁 Estrutura do Projeto

```text
mobile_webdriverio_js/
├── 🤖 app/
│   ├── android/
│   │   └── android.wdio.native.app.v2.2.0.apk
│   └── ios/
│       └── wdiodemoapp.app
├── ⚙️ config/
│   ├── wdio.shared.conf.js
│   ├── wdio.android.local.conf.js
│   ├── wdio.ios.local.conf.js
│   └── wdio.browserstack.conf.js
├── 🧪 tests/
│   ├── 📊 data/
│   │   └── users.json
│   ├── 🛠️ helpers/
│   │   ├── data.helper.js
│   │   └── screenshot.helper.js
│   ├── 📄 pageobjects/
│   │   ├── base.page.js
│   │   ├── login.page.js
│   │   ├── signup.page.js
│   │   ├── home.page.js
│   │   ├── forms.page.js
│   │   └── navigation.page.js
│   └── 📑 specs/
│       ├── auth.spec.js
│       ├── navigation.spec.js
│       └── forms.spec.js
├── 📊 reports/
│   ├── allure-results-android/
│   ├── allure-results-ios/
│   ├── allure-report-android/
│   ├── allure-report-ios/
│   ├── screenshots/
│   └── page-sources/
├── 📝 logs/
├── 🔑 .env
├── 🔄 .github/workflows/
├── 📦 package.json
├── 📄 Requisitos.md
└── 📘 README.md
```

---

## 🧪 Cenários de Teste (CT01 a CT10)

### 🔐 Autenticação (Login / Cadastro)
- 🟢 **CT01:** Login com credenciais válidas
- 🔴 **CT02:** Exibir erro ao logar com credenciais inválidas
- 🟢 **CT03:** Cadastrar novo usuário com dados válidos
- 🔴 **CT04:** Exibir erro ao cadastrar com campos obrigatórios vazios

### 🧩 Navegação entre Telas
- 🔄 **CT05:** Navegar da Home para Login
- 🔄 **CT06:** Navegar da Home para Formulários
- 🔄 **CT07:** Retornar para Home a partir de tela interna

### 📝 Formulários e Validações
- 🟢 **CT08:** Preencher e enviar formulário com dados válidos
- 🔴 **CT09:** Exibir erro para e-mail inválido
- 🔴 **CT10:** Exibir erro para campos obrigatórios não preenchidos

---

## 📄 Page Object Pattern (PO)

O projeto adota a arquitetura **Page Object Pattern**, separando seletores e ações de tela da lógica de teste:

- 📄 [`base.page.js`](./tests/pageobjects/base.page.js) → Classe base com resolução dinâmica de plataforma e evidências.
- 🔐 [`login.page.js`](./tests/pageobjects/login.page.js) → Elementos e ações da tela de Login.
- 📝 [`signup.page.js`](./tests/pageobjects/signup.page.js) → Elementos e ações da tela de Cadastro.
- 🏠 [`home.page.js`](./tests/pageobjects/home.page.js) → Elementos e validações da Home.
- 🔄 [`navigation.page.js`](./tests/pageobjects/navigation.page.js) → Navegação pelas abas do app.
- 📋 [`forms.page.js`](./tests/pageobjects/forms.page.js) → Componentes e formulários.

---

## 📊 Data-Driven Testing

A parametrização de dados de teste utiliza o arquivo [`tests/data/users.json`](./tests/data/users.json), permitindo testar múltiplos fluxos (sucesso, dados inválidos e exceções) sem duplicar código.

---

## 🔍 Code Review & Qualidade (ESLint)

O projeto conta com o **ESLint** configurado em `eslint.config.js` para manter o padrão de código JavaScript:

```bash
# 🔍 Executar verificação estática
npm run lint
```

---

## 📸 Evidências e Relatórios

Em caso de falha nos testes, o framework gera automaticamente:
1. 📸 **Screenshot PNG:** Salvo em `reports/screenshots/` e anexado ao Allure.
2. 📄 **Page Source XML:** Salva a árvore inteira de elementos do dispositivo em `reports/page-sources/` e anexa ao Allure como `application/xml`.

### 📊 Comandos do Allure Report:

#### 🤖 Android:
```bash
npm run report:allure:android
```

#### 🍏 iOS:
```bash
npm run report:allure:ios
```

---

## 📑 Documentação JSDoc

Gere a documentação HTML do código-fonte:

```bash
npm run docs
```
Acesse os arquivos gerados em `reports/jsdoc/index.html`.

---

## 🚀 Inicialização Manual do Appium (Opcional)

Por padrão, o WebdriverIO inicia o servidor Appium automaticamente. Caso prefira iniciar manualmente:

```bash
npx appium server --address 127.0.0.1 --port 4723 --log-level info
```

---

## ⚡ Execução dos Testes

### 🤖 Suíte Completa Android:
```bash
npm run test:android
```

### 🍏 Suíte Completa iOS:
```bash
npm run test:ios
```

### 🎯 Execução de Specs Isolados:
```bash
# Autenticação (CT01 a CT04)
npx wdio run ./config/wdio.android.local.conf.js --spec ./tests/specs/auth.spec.js

# Navegação (CT05 a CT07)
npx wdio run ./config/wdio.android.local.conf.js --spec ./tests/specs/navigation.spec.js

# Formulários (CT08 a CT10)
npx wdio run ./config/wdio.android.local.conf.js --spec ./tests/specs/forms.spec.js
```

---

## 🔑 Variáveis de Ambiente (`.env`)

Crie o arquivo `.env` na raiz do projeto:

```env
# ☁️ BrowserStack (Opcional)
BROWSERSTACK_USERNAME=YOUR_BROWSERSTACK_USERNAME
BROWSERSTACK_ACCESS_KEY=YOUR_BROWSERSTACK_ACCESS_KEY
BROWSERSTACK_APP_URL=bs://YOUR_APP_ID

# ⚙️ Ambiente
TEST_ENV=local

# 🤖 Dispositivo Android Local
ANDROID_UDID=ZF525KTJ77
ANDROID_DEVICE_NAME=moto g86 5G
ANDROID_PLATFORM_VERSION=16

# 🍏 Simulador / Dispositivo iOS (Opcional)
IOS_UDID=E9039409-69F4-4FFB-BC0F-A5A74C8BA32A
IOS_DEVICE_NAME=iPhone 15
IOS_PLATFORM_VERSION=17.5
```

---

## 🍏 Testes no iOS (Simulador e CI/CD)

### 1. 🛠️ Pré-requisitos para Execução Local (macOS)
- **macOS** com Xcode e Xcode Command Line Tools instalados (`xcode-select --install`).
- Driver **XCUITest** do Appium instalado:
  ```bash
  appium driver install xcuitest
  ```
- App descompactado em `app/ios/wdiodemoapp.app` (Bundle Identifier: **`org.wdiodemoapp`**).

### 2. ⚡ Execução no iOS
```bash
npm run test:ios
```

### 3. 🧩 Resolução Dinâmica de Seletores (iOS / Android)
A [`BasePage`](./tests/pageobjects/base.page.js) resolve os seletores dinamicamente baseando-se em `browser.isIOS`:
```javascript
static elementSelectors = {
  ios: [
    '~accessibilityId',
    '-ios predicate string:label == "Texto" OR name == "nomeElemento"',
    '//XCUIElementTypeButton[@name="Forms"]'
  ],
  android: [
    'android=new UiSelector().description("nomeElemento")',
    '~accessibilityId',
    '//*[@content-desc="nomeElemento"]'
  ]
}
```
- **Suporte Nativo iOS:** Manipulação automática de modais e roletas nativas do iOS (`XCUIElementTypePickerWheel`).

### 4. 📲 Gestão Dinâmica de UDID
- O `wdio.ios.local.conf.js` injeta `appium:udid` dinamicamente a partir da variável `IOS_UDID`.
- No GitHub Actions ([`.github/workflows/ios-integration-tests.yml`](./.github/workflows/ios-integration-tests.yml)), o UDID do simulador inicializado é extraído automaticamente via `simctl`.

---

## 📚 Referências

- 📄 [Requisitos do Projeto (`Requisitos.md`)](./Requisitos.md)
- 📘 [Guia Técnico do WebdriverIO (`WebDriverIO.md`)](./WebDriverIO.md)
- 🌐 [Documentação Oficial WebdriverIO Mobile](https://webdriver.io/docs/api/mobile)
- 🚀 [Releases da App Nativa WebdriverIO](https://github.com/webdriverio/native-demo-app/releases)