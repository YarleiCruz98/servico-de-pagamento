# Servico de Pagamento - Pipeline de Integracao Continua

Projeto desenvolvido em outra disciplina da pos-graduacao, estendido com uma **pipeline de integracao continua (CI)** utilizando **GitHub Actions**. A aplicacao implementa um servico de pagamentos com testes automatizados executados a cada alteracao no repositorio.

**Repositorio:** [https://github.com/YarleiCruz98/servico-de-pagamento](https://github.com/YarleiCruz98/servico-de-pagamento)

---

## Sobre o projeto

A classe `ServicoDePagamento` gerencia pagamentos de contas com codigo de barras. Cada pagamento possui:


| Propriedade    | Descricao                                          |
| -------------- | -------------------------------------------------- |
| `codigoBarras` | Codigo de barras da conta                          |
| `empresa`      | Nome da empresa emissora                           |
| `valor`        | Valor pago                                         |
| `categoria`    | `'cara'` se valor > 100, `'padrao'` caso contrario |




### Metodos

- `pagar(codigoBarras, empresa, valor)` - registra um novo pagamento na lista interna.
- `consultarUltimoPagamento()` - retorna o ultimo pagamento realizado ou `null` se nao houver registros.



### Exemplo de uso

```javascript
const ServicoDePagamento = require('./src/ServicoDePagamento');

const servico = new ServicoDePagamento();
servico.pagar('0987-7656-3475', 'Samar', 156.87);

console.log(servico.consultarUltimoPagamento());
// {
//   codigoBarras: '0987-7656-3475',
//   empresa: 'Samar',
//   valor: 156.87,
//   categoria: 'cara'
// }
```

---



## Estrutura do repositorio

```
servico-de-pagamento/
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   └── ServicoDePagamento.js
├── test/
│   └── ServicoDePagamento.test.js
├── scripts/
│   └── test-ci.js
├── package.json
└── README.md
```

---



## Conceitos de Integracao Continua



### O que e CI (Continuous Integration)?

Integracao Continua e a pratica de integrar alteracoes de codigo com frequencia, executando **builds e testes automatizados** a cada mudanca. O objetivo e detectar erros cedo, manter o codigo sempre em estado deployavel e reduzir riscos de integracao.

### GitHub Actions

Plataforma de automacao nativa do GitHub. Workflows sao definidos em arquivos YAML (`.github/workflows/`) e executados em **runners** (maquinas virtuais) provisionadas pelo GitHub.

### Pipeline

Sequencia automatizada de etapas (steps) que compoem um job. Neste projeto, a pipeline:

1. Faz checkout do codigo
2. Instala o Node.js e as dependencias (`npm ci`)
3. Executa os testes automatizados
4. Gera relatorios em formatos JUnit XML e HTML
5. Publica os resultados no GitHub Checks
6. Armazena os relatorios como **artifacts** da execucao

---



## Pipeline - gatilhos (triggers)

A pipeline e acionada de **tres formas distintas**, conforme exigido:


| Gatilho      | Evento YAML         | Quando executa                                       |
| ------------ | ------------------- | ---------------------------------------------------- |
| **Push**     | `push`              | A cada commit enviado as branches `main` ou `master` |
| **Manual**   | `workflow_dispatch` | Disparo sob demanda pela interface do GitHub Actions |
| **Agendada** | `schedule`          | Toda segunda-feira as 06:00 UTC (03:00 BRT)          |


Alem disso, a pipeline tambem roda em **pull requests** para validar alteracoes antes do merge.

### Disparo manual

1. Acesse a aba **Actions** no repositorio
2. Selecione o workflow **CI - Testes Automatizados**
3. Clique em **Run workflow** e confirme

---



## Relatorios de testes

Os testes utilizam **Mocha** com **Node Assert**. Na CI, tres formatos de saida sao gerados:


| Arquivo              | Formato   | Uso                                                 |
| -------------------- | --------- | --------------------------------------------------- |
| `reports/junit.xml`  | JUnit XML | Publicacao no GitHub Checks via dorny/test-reporter |
| `reports/index.html` | HTML      | Relatorio visual (Mochawesome)                      |
| `reports/index.json` | JSON      | Dados estruturados para integracoes                 |




### Onde encontrar os relatorios

1. **GitHub Checks** - na pagina do commit ou PR, clique em **Details** ao lado do check *Relatorio Mocha*
2. **Artifacts** - na pagina da execucao do workflow, secao **Artifacts** com `relatorio-testes-run-<numero>`
3. **Resumo** - aba **Summary** da execucao, com tabela informativa gerada automaticamente

---



## Executar localmente



### Pre-requisitos

- Node.js 18 ou superior
- npm



### Instalacao e testes

```bash
git clone https://github.com/YarleiCruz98/servico-de-pagamento.git
cd servico-de-pagamento
npm install
npm test
npm run test:ci
```

Apos `npm run test:ci`, abra `reports/index.html` no navegador para visualizar o relatorio HTML.

---



## Ferramentas utilizadas


| Ferramenta               | Papel na solucao                           |
| ------------------------ | ------------------------------------------ |
| **Node.js**              | Runtime da aplicacao e dos testes          |
| **Mocha**                | Framework de testes                        |
| **Node Assert**          | Assercoes nativas do Node.js               |
| **Mocha JUnit Reporter** | Geracao de relatorio XML para CI           |
| **Mochawesome**          | Relatorio HTML interativo                  |
| **GitHub Actions**       | Orquestracao da pipeline de CI             |
| **dorny/test-reporter**  | Publicacao de resultados nos GitHub Checks |
| **upload-artifact**      | Armazenamento dos relatorios na pipeline   |


