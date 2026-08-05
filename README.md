# mobile_webdriverio_js

Planejamento e esqueleto inicial para automação mobile com **WebdriverIO + Appium + Mocha + Chai**, seguindo os requisitos definidos em `Requisitos.md`.

## Objetivo

Estruturar o projeto para testes do app nativo:

- Android APK: `app/android/android.wdio.native.app.v2.2.0.apk`
- iOS App (simulador): `app/ios/ios.simulator.wdio.native.app.v2.2.0.zip`

## Stack definida

- Linguagem: JavaScript (ESM)
- Framework de automação: WebdriverIO
- Automação mobile: Appium
- Gerenciador de testes: Mocha
- Asserts: Chai
- Relatórios: Allure Report
- CI/CD: GitLab CI/CD
- Nuvem de dispositivos: BrowserStack (opcional)

## Estrutura do projeto

```
mobile_webdriverio_js/
├── app/
│   ├── android/
│   │   └── android.wdio.native.app.v2.2.0.apk
│   └── ios/
│       └── ios.simulator.wdio.native.app.v2.2.0.zip
├── config/
│   ├── wdio.shared.conf.js
│   ├── wdio.android.local.conf.js
│   ├── wdio.ios.local.conf.js
│   └── wdio.browserstack.conf.js
├── tests/
│   ├── data/
│   │   └── users.json
│   ├── helpers/
│   │   ├── data.helper.js
│   │   └── screenshot.helper.js
│   ├── pageobjects/
│   │   ├── base.page.js
│   │   ├── login.page.js
│   │   ├── signup.page.js
│   │   ├── home.page.js
│   │   ├── forms.page.js
│   │   └── navigation.page.js
│   └── specs/
│       ├── auth.spec.js
│       ├── navigation.spec.js
│       └── forms.spec.js
├── reports/
│   ├── allure-results/
│   └── screenshots/
├── logs/
├── .env
├── .gitlab-ci.yml
├── package.json
├── Requisitos.md
└── README.md
```

## Cenários planejados (10)

### Login / Cadastro

1. C01 - Login com credenciais válidas
2. C02 - Erro ao login com credenciais inválidas
3. C03 - Cadastro com dados válidos
4. C04 - Erro de validação no cadastro com campos obrigatórios vazios

### Navegação entre telas

5. C05 - Navegar da Home para Login
6. C06 - Navegar da Home para Formulários
7. C07 - Retornar para Home a partir de tela interna

### Formulários e mensagens de erro

8. C08 - Preencher e enviar formulário com dados válidos
9. C09 - Exibir erro para e-mail inválido
10. C10 - Exibir erro para campos obrigatórios não preenchidos

## Page Object Pattern

O projeto já está preparado com classes separadas por contexto de tela:

- `login.page.js`
- `signup.page.js`
- `home.page.js`
- `navigation.page.js`
- `forms.page.js`

Todas estão no formato inicial (métodos vazios com `TODO`) para implementação incremental.

## Data-driven

Foi criado o arquivo `tests/data/users.json` como base para parametrização de testes com múltiplos conjuntos de dados.

## Evidências e relatórios

- `afterTest` configurado para screenshot automático em falha.
- `@wdio/allure-reporter` configurado com saída em `reports/allure-results`.

## Execução em ambientes diferentes

- Android local: `config/wdio.android.local.conf.js`
- iOS local: `config/wdio.ios.local.conf.js`
- BrowserStack (opcional): `config/wdio.browserstack.conf.js`

## Variáveis de ambiente

Arquivo `.env` criado com placeholders para BrowserStack:

- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`
- `BROWSERSTACK_APP_URL`

## CI/CD (GitLab)

Arquivo `.gitlab-ci.yml` com pipeline base de execução e publicação de artefatos (`reports` e `logs`).

## Próximos passos sugeridos

1. Implementar métodos dos Page Objects.
2. Implementar lógica dos 10 cenários.
3. Incluir asserts com Chai.
4. Refinar massa de dados para cenários positivos e negativos.
5. Publicar/visualizar relatório Allure após execução.
