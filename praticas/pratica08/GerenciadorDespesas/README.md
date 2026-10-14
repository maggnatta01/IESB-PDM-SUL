# Prática 08 - Gerenciador de Despesas

## Objetivo

Adicionar categorias às despesas, validar o formulário, somar os valores e filtrar a lista sem alterar os dados originais.

## Tecnologias

- React Native 0.86 e React 19
- Expo SDK 57
- React Navigation 7 (Native Stack e Bottom Tabs)
- Ionicons, incluído em `@expo/vector-icons`

## Instalação e execução

Use Node.js LTS. Na pasta `praticas/pratica08/GerenciadorDespesas`, execute:

```bash
npm install
npx expo install --check
npm test
npx expo start
```

Abra o projeto com uma versão do Expo Go compatível com o SDK 57 ou use um emulador configurado.

## Estrutura

```text
GerenciadorDespesas/
|-- components/
|   |-- CategoriaSelector.js
|   |-- DespesaItem.js
|   |-- DespesasContext.js
|   |-- DespesasSumario.js
|   |-- IconButton.js
|   `-- ListaDespesas.js
|-- screens/
|   |-- DespesasRecentes.js
|   |-- GerenciarDespesa.js
|   `-- TodasDespesas.js
|-- App.js
|-- app.json
|-- index.js
|-- package.json
`-- README.md
```

## Validação do formulário

A descrição é obrigatória e não pode conter apenas espaços. O valor precisa ser maior que zero e corresponder a um número inteiro ou decimal com no máximo duas casas, usando vírgula ou ponto como separador. A expressão regular `^\d+(?:[.,]\d{1,2})?$` rejeita valores vazios, negativos, não numéricos e formatos com mais de duas casas. A conversão troca a vírgula por ponto antes de armazenar o valor numérico. Também é obrigatório escolher uma das quatro categorias.

## Resumo e filtro

`DespesasSumario` calcula o valor total com `reduce()` sobre os dados recebidos e formata o resultado em reais. O total reflete a lista visível, inclusive quando uma categoria específica está selecionada.
`-- ListaDespesas.js
|-- screens/
|   |-- DespesasRecentes.js
|   |-- GerenciarDespesa.js
|   `-- TodasDespesas.js
|-- tests/
|   `-- despesas.test.js
|-- utils/
|   `-- despesas.js
## Capturas de tela

Adicione imagens reais do aplicativo nos espaços abaixo após executar o projeto:

### Formulário e seleção de categoria

<!-- Adicionar captura real do formulário -->

### Lista com categorias e resumo do total

<!-- Adicionar captura real da lista -->

### Filtro por categoria

<!-- Adicionar captura real do filtro aplicado -->