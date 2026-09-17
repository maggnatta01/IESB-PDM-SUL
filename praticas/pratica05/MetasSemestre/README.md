# MetasSemestre

Aplicativo React Native com Expo para cadastrar e acompanhar metas academicas do semestre.

## Objetivo

Praticar `useState`, props, componentizacao, `Pressable`, `useEffect`, `FlatList` e persistencia local com AsyncStorage.

## Tecnologias

- Expo e React Native
- `useState` para o texto do formulario, a lista de metas e o estado de carregamento
- Props para comunicar `App`, `MetaInput` e `MetaList`
- `Pressable` para adicionar, concluir e remover metas
- `FlatList` para renderizar a lista
- `react-native-safe-area-context` para `SafeAreaProvider` e `SafeAreaView`
- `@react-native-async-storage/async-storage` para persistencia local

## Como executar

Na pasta `MetasSemestre`:

```bash
npm install
npx expo start
```

As dependencias especificas do Expo podem ser instaladas com:

```bash
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
```

## Organizacao

- `App.js`: estado, criacao e remocao de metas, e efeitos de persistencia.
- `components/MetaInput.js`: campo de texto e botao de adicionar; recebe `value`, `onChangeText` e `onAdd`.
- `components/MetaList.js`: lista com `FlatList`, conclusao e remocao; recebe `metas` e callbacks por props.

Cada meta possui `id`, `texto`, `criadaEm` e `concluida`. O identificador e gerado com `Date.now().toString()` e a remocao usa `filter()` pelo `id`.

## useEffect e AsyncStorage

O primeiro `useEffect`, em `App.js`, executa na montagem, usa `AsyncStorage.getItem('@metas_semestre')`, aplica `JSON.parse()` e carrega as metas. O estado `carregamentoConcluido` impede o salvamento prematuro.

O segundo `useEffect`, no mesmo arquivo, observa `metas` e salva cada alteracao com `JSON.stringify(metas)` e `AsyncStorage.setItem('@metas_semestre', ...)`. Os dois fluxos usam `try/catch` e exibem uma mensagem amigavel em caso de erro.

## Prints

### 1. Lista vazia

<!-- Insira aqui um print real da lista vazia. -->

### 2. Lista com metas

<!-- Insira aqui um print real da lista com metas. -->

### 3. Aplicativo reaberto com metas persistidas

<!-- Insira aqui um print real do aplicativo reaberto. -->
