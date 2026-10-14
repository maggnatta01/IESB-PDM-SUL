import { createContext } from 'react';

export const DespesasContext = createContext({
  despesas: [],
  adicionarDespesa: () => {},
});