# Prática 09 — Gerenciador de Despesas 2.0

Aplicativo Expo para registrar, editar, excluir e consultar despesas com estado global, validação, busca, filtros e persistência local.

## Identificação do aluno

- **Nome:** Thiago Pereira Dos Santos
- **Matrícula:** 2424290067

## Tecnologias

- Expo SDK 57, React Native 0.86 e React 19.
- React Navigation 7: Native Stack e Bottom Tabs.
- Context API e `useReducer`.
- AsyncStorage para persistência local.
- `@expo/vector-icons` para os ícones.
- Testes automatizados com `node:test`.

## Instalação e execução

Na pasta `praticas/Gerenciador-despesas-2.0`, execute:

```bash
npm install
npx expo install --check
npm test
npx expo start
```

Leia o QR code com o Expo Go compatível com o SDK 57 ou execute em um emulador.

## Estrutura

```text
Gerenciador-despesas-2.0/
|-- src/
|   |-- components/despesa/  # Cartão, lista e resumo
|   |-- constants/           # Categorias e cores dos temas
|   |-- hooks/               # Hook de debounce
|   |-- screens/             # Recentes, todas e formulário
|   |-- store/               # Context API, reducer e persistência
|   `-- utils/               # Validação, datas e totalizadores
|-- tests/                   # Testes das regras de domínio
|-- App.js
|-- app.json
|-- index.js
`-- package.json
```

## Estado global e persistência

`ExpensesContextProvider` envolve o `NavigationContainer` e disponibiliza `useExpenses()` para todas as telas. O reducer mantém o modelo `{ id, description, amount, date, category }` e trata `ADD`, `UPDATE`, `DELETE` e `SET` sem mutar o estado. O hook lança um erro claro se for usado fora do provider.

O provider carrega a chave `@expenses` do AsyncStorage antes de começar a persistir alterações. Assim, a lista vazia inicial não sobrescreve os dados existentes. Erros de leitura são apresentados com uma opção para tentar novamente, e erros de gravação são informados no console.

## Cadastro, edição e validação

O botão `+` abre o formulário vazio. A seleção de uma despesa envia `expenseId` à rota do formulário, que carrega seus dados e muda o título para **Editar despesa**. O cadastro e a edição atualizam o estado global; o identificador original é preservado nas edições. A exclusão exige confirmação.

Os campos ficam em um único objeto `form`. A validação verifica descrição com ao menos três caracteres, valor maior que zero com até duas casas decimais, data válida não futura e categoria obrigatória. A categoria é selecionada em um Modal a partir da constante compartilhada `CATEGORIES`.

## Listas, busca, filtros e temas

A tela de despesas recentes deriva os últimos sete dias do contexto e não inclui datas futuras. A tela de todas as despesas pesquisa descrições sem diferenciar maiúsculas de minúsculas, com `useDebounce` de 300 ms e filtragem memoizada por `useMemo`. O filtro por categoria é combinável com a busca. Quantidade, total e estado vazio correspondem aos resultados exibidos; a opção **Limpar tudo** pede confirmação.

As telas observam o tema do sistema com `useColorScheme`. Os cartões usam sombras adaptadas à plataforma e a lista apresenta duas colunas em larguras superiores a 600 pontos.

## Capturas de tela

Não foram anexadas capturas, pois elas devem ser capturadas no aplicativo em execução. Salve imagens reais na pasta `screenshots/` e substitua os espaços abaixo antes da entrega:

### Lista no modo claro

<!-- Captura real: screenshots/lista-modo-claro.png -->

### Lista no modo escuro

<!-- Captura real: screenshots/lista-modo-escuro.png -->

### Formulário com mensagens de validação

<!-- Captura real: screenshots/formulario-validacao.png -->
