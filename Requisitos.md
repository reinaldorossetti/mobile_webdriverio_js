Utilizando o aplicativo native-demo-app do WebDriverIO, um aplicativo de demonstração
para testes de automação mobile, desenvolva uma automação que atenda os seguintes
requisitos:
1. Construção dos Scripts:
○ Criar 10 cenários de teste que cubram as principais funcionalidades do aplicativo
mobile. Os cenários devem incluir:
■ Login/Cadastro
■ Navegação entre telas
■ Preenchimento de formulários
■ Verificação de mensagens de erro
○ Implementar o padrão Page Object para organizar os elementos da interface e as
ações a serem realizadas.
○ Utilizar um arquivo de dados (CSV, JSON) para parametrizar alguns dos testes,
permitindo a execução com diferentes conjuntos de dados (data-driven). (opcional)

2. Execução em Ambientes Diferentes:
○ Configurar o projeto para executar os testes em emuladores de Android e iOS.
○ Integrar o projeto com o BrowserStack para executar os testes em dispositivos
reais. (opcional)

3. Geração de Evidências:
○ Configurar a captura automática de screenshots durante a execução dos testes,
para facilitar a análise de falhas.
○ Gerar relatórios detalhados de testes, utilizando Allure Report ou ExtentReport,
com os seguintes elementos:
■ Resumo dos testes executados
■ Screenshots das falhas
■ Logs de execução
■ Informações sobre o ambiente de teste

4. Integração CI/CD:
○ Configurar um pipeline de CI/CD (GitLab CI/CD) para automatizar a execução dos
testes a cada commit ou merge request.
Sugestão de tecnologias e ferramentas que devem ser utilizadas:
● Linguagem: JavaScript
● Framework: WebdriverIO
● Biblioteca: Appium
● Gerenciador de testes: Mocha
● Asserts: Chai
● Relatórios: Allure Report ou ExtentReport
● CI/CD: GitLab CI/CD
● Cloud de dispositivos: BrowserStack
● Controle de versão: Git
Entrega:
● Código fonte completo do projeto pelo GitHub ou GitLab
● Documentação sobre a configuração do ambiente e a execução dos testes no
README.md do projeto