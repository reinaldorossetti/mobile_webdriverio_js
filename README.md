# mobile_webdriverio_js

Planejamento e esqueleto inicial para automação mobile com **WebdriverIO + Appium + Mocha + Chai**, seguindo os requisitos definidos em `Requisitos.md`.

Os testes estão usando a esteira do Github Actions criando um emulador android para executar os testes, e gerando o relatório no Allure report, mas podem ser adaptados para GitLab CI/CD ou outro provedor de CI/CD.

.github/workflows/
browserstack-tests.yml
mobile-integration-tests.yml

** Observação: ** Temos o pipeline para rodar no browser stack, mas precisamos de uma conta paga para conseguir subir o app e rodar os testes. Por isso, a execução local é a forma mais prática de validar os testes.

Após clonar o projeto, instale as dependências e execute os testes Android localmente com:
```bash
npm run test:android
```

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
- CI/CD: GitHub Actions
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

## Code review e qualidade

O projeto utiliza o **ESLint** para realizar uma revisão estática do código JavaScript antes da execução dos testes. A configuração está no arquivo `eslint.config.js` e analisa as pastas `config/` e `tests/`.

Durante a revisão, são identificados problemas como:

- Variáveis ou referências não definidas;
- Imports e variáveis não utilizados;
- Erros comuns de sintaxe e boas práticas JavaScript;
- Uso incompatível com os globais do WebdriverIO, Mocha e Node.js.

Para executar o code review, use:

```bash
npm run lint
```

O comando falha caso encontre algum erro, permitindo corrigir os problemas antes de executar a suíte mobile.

## Evidências e relatórios

- `afterTest` configurado para screenshot automático em falha.
- `@wdio/allure-reporter` configurado com saída em `reports/allure-results`.

### Gerar relatório Allure em arquivo único

Use o comando abaixo para gerar um `index.html` único em `reports/allure-report`:
```bash
npx allure generate --single-file reports/allure-results --clean -o reports/allure-report
npx allure open reports/allure-report
```

### Gerar documentação JSDoc

O projeto utiliza a biblioteca **JSDoc** para gerar documentação HTML a partir dos comentários JSDoc do código JavaScript.

Para gerar a documentação das pastas `config/` e `tests/`, execute:

```bash
npm run docs
```

Os arquivos serão gerados em `reports/jsdoc/`. Abra `reports/jsdoc/index.html` no navegador para visualizar a documentação.

## Inicialização manual do Appium

As configurações `wdio.android.local.conf.js` e `wdio.ios.local.conf.js` já iniciam o Appium automaticamente pelo serviço do WebdriverIO. Caso prefira iniciar o servidor manualmente, execute o comando abaixo na raiz do projeto:

```bash
npx appium server --address 127.0.0.1 --port 4723 --log-level info
```

Parâmetros utilizados:

- `--address 127.0.0.1`: aceita conexões somente no computador local.
- `--port 4723`: porta padrão usada pelas configurações locais do WebdriverIO.
- `--base-path /`: caminho base padrão da API do Appium; não é necessário informá-lo.
- `--log-level info`: exibe logs informativos do servidor.

> No Git Bash, se precisar informar explicitamente o `--base-path`, desative a conversão automática de caminhos:

```bash
MSYS_NO_PATHCONV=1 npx appium server --address 127.0.0.1 --port 4723 --base-path / --log-level info
```

Mantenha esse terminal aberto durante a execução dos testes. Ao iniciar o Appium manualmente, remova ou desative o serviço `appium` da configuração do WebdriverIO para evitar conflito na porta `4723`.

## Execução dos testes

Os comandos abaixo executam os testes usando a configuração local do Android. Antes de executar, confirme que o emulador/dispositivo está disponível e que o Appium pode ser iniciado pela configuração do WebdriverIO.

### Suíte completa

Executa todos os cenários dos arquivos em `tests/specs/`:

```bash
npm run test:android
```

### Execução por feature

Para executar uma feature isoladamente:

```bash
# Autenticação: cenários C01 a C04
npx wdio run ./config/wdio.android.local.conf.js --spec ./tests/specs/auth.spec.js

# Navegação: cenários C05 a C07
npx wdio run ./config/wdio.android.local.conf.js --spec ./tests/specs/navigation.spec.js

# Formulários e mensagens de erro: cenários C08 a C10
npx wdio run ./config/wdio.android.local.conf.js --spec ./tests/specs/forms.spec.js
```

Para executar a suíte completa ou uma feature em outro ambiente, substitua `wdio.android.local.conf.js` por `wdio.ios.local.conf.js` ou `wdio.browserstack.conf.js`.

## Execução em ambientes diferentes

- Android local: `config/wdio.android.local.conf.js`
- iOS local: `config/wdio.ios.local.conf.js`
- BrowserStack (opcional): `config/wdio.browserstack.conf.js`

## Variáveis de ambiente

Arquivo `.env` criado com placeholders para BrowserStack:

- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`
- `BROWSERSTACK_APP_URL`

## Próximos passos sugeridos

1. Implementar métodos dos Page Objects.
2. Implementar lógica dos 10 cenários.
3. Incluir asserts com Chai.
4. Refinar massa de dados para cenários positivos e negativos.
5. Publicar/visualizar relatório Allure após execução.
