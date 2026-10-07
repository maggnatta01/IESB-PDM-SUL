# Prática 07 - Atividade Screen

## Objetivo

Demonstrar navegação aninhada com React Navigation: um Native Stack contendo um Bottom Tabs, três telas e um componente reutilizável de botão com ícone.

## Instalação

Na pasta `praticas/pratica07/Atividade-screen`, instale as dependências:

```bash
npm install
```

As dependências nativas foram instaladas em versões compatíveis com o Expo SDK 57.

## Execução

```bash
npx expo start
```

Abra o projeto no Expo Go compatível com SDK 57 ou em um emulador configurado.

## Estrutura

```text
Atividade-screen/
|-- assets/
|-- components/
|   `-- IconButton.js
|-- screens/
|   |-- DespesasRecentes.js
|   |-- TodasDespesas.js
|   `-- GerenciarDespesa.js
|-- App.js
|-- app.json
|-- package.json
`-- package-lock.json
```

## Navegação

O Native Stack define a rota inicial `Despesas`, que renderiza `BottomTabScreen`, e a rota `GerenciarDespesa`. O Bottom Tabs fica aninhado na rota `Despesas` e alterna entre `DespesasRecentes` e `TodasDespesas`.

As abas usam os ícones Ionicons `hourglass` e `wallet-outline`. O rótulo das abas usa fonte de 12 pontos.

## IconButton

`components/IconButton.js` recebe `icon`, `size`, `color` e `onPress`. Ele usa `Pressable` para responder ao toque e aplica opacidade de 0.5 enquanto pressionado; o ícone é renderizado com Ionicons.

O botão de adicionar fica no cabeçalho das abas. Como essa navegação está dentro do Native Stack, `navigation.getParent()` acessa o Stack pai e abre a rota `GerenciarDespesa`.

## Prints

### Despesas Recentes

[Adicionar print aqui]

### Todas as Despesas

[Adicionar print aqui]

### Gerenciar Despesa

[Adicionar print aqui]

### Navegação funcionando

[Adicionar print aqui]