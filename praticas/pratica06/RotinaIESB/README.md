# RotinaIESB

Aplicativo React Native com Expo para organizar compromissos da rotina academica do aluno do IESB em uma unica tela.

## Objetivo

Cadastrar, visualizar e remover compromissos, mantendo os dados salvos localmente quando o aplicativo for fechado e reaberto.

## Como o projeto foi criado

```bash
npx create-expo-app@latest RotinaIESB --template blank
```

## Tecnologias e dependencias

- Expo SDK 57
- React Native
- `useState` para o texto digitado e o array de compromissos
- Props e componentizacao
- `Pressable` com feedback visual e `android_ripple`
- `FlatList` para a lista
- `react-native-safe-area-context` para `SafeAreaProvider` e `SafeAreaView`
- `@react-native-async-storage/async-storage` para persistencia local

Instalacao das dependencias nativas:

```bash
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
```

## Estrutura

```text
RotinaIESB/
├── assets/
│   └── logo.png
├── components/
│   ├── CompromissoInput.js
│   └── CompromissoList.js
├── App.js
├── app.json
├── index.js
├── labels.js
├── package.json
└── package-lock.json
```

- `App.js`: controla os estados, adiciona e remove compromissos e configura a persistencia.
- `labels.js`: concentra os rotulos utilizados na interface.
- `components/CompromissoInput.js`: recebe `value`, `onChangeText`, `onAdd` e `labels` por props.
- `components/CompromissoList.js`: recebe `itens`, `onDelete`, `tituloLista` e `listaVazia`, usando `FlatList`.

Cada compromisso possui `id`, `texto` e `criadoEm`. O `id` e criado com `Date.now().toString()` e a remocao usa `filter()` pelo identificador.

## Persistencia

Em `App.js`, o primeiro `useEffect` executa na montagem, chama `AsyncStorage.getItem('@rotina_iesb_compromissos')`, usa `JSON.parse()` e carrega os dados. O estado `carregamentoConcluido` impede que o salvamento inicial sobrescreva os compromissos existentes.

O segundo `useEffect` observa o array `compromissos` e salva cada alteracao usando `AsyncStorage.setItem()` e `JSON.stringify()`. Os dois processos usam `try/catch` e exibem mensagens amigaveis com `Alert.alert()` em caso de erro.

## Como executar

Na pasta `pratica06/RotinaIESB`:

```bash
npm install
npx expo install --check
npx expo start
```

## Prints

### Tela vazia

<!-- Insira aqui um print real da tela vazia. -->

### Tela com compromissos

<!-- Insira aqui um print real da tela com compromissos. -->

### Aplicativo reaberto com dados persistidos

<!-- Insira aqui um print real do aplicativo reaberto. -->
