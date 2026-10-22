import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import expensesReducer from './expensesReducer';

const STORAGE_KEY = '@expenses';
const ExpensesContext = createContext(null);

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canPersist, setCanPersist] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const isMounted = useRef(false);

  const loadExpenses = useCallback(async () => {
    setIsLoaded(false);
    setLoadError(null);

    try {
      const storedExpenses = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedExpenses) {
        const parsedExpenses = JSON.parse(storedExpenses);
        if (!Array.isArray(parsedExpenses)) {
          throw new Error('Os dados armazenados de despesas não são uma lista.');
        }
        if (isMounted.current) dispatch({ type: 'SET', expenses: parsedExpenses });
      }
      if (isMounted.current) {
        setCanPersist(true);
        setLoadError(null);
      }
    } catch (error) {
      console.error('Não foi possível carregar as despesas salvas.', error);
      if (isMounted.current) {
        setCanPersist(false);
        setLoadError('Não foi possível carregar as despesas salvas. Verifique o armazenamento e tente novamente.');
      }
    } finally {
      if (isMounted.current) setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    loadExpenses();
    return () => {
      isMounted.current = false;
    };
  }, [loadExpenses]);

  useEffect(() => {
    if (!isLoaded || !canPersist || loadError) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses)).catch((error) => {
      console.error('Não foi possível salvar as despesas.', error);
    });
  }, [canPersist, expenses, isLoaded, loadError]);

  const addExpense = useCallback((expense) => {
    dispatch({ type: 'ADD', expense });
  }, []);
  const updateExpense = useCallback((expense) => {
    dispatch({ type: 'UPDATE', expense });
  }, []);
  const deleteExpense = useCallback((id) => {
    dispatch({ type: 'DELETE', id });
  }, []);
  const setExpenses = useCallback((nextExpenses) => {
    dispatch({ type: 'SET', expenses: nextExpenses });
  }, []);
  const retryLoad = useCallback(() => {
    loadExpenses();
  }, [loadExpenses]);

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        setExpenses,
        isLoaded,
        loadError,
        retryLoad,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de ExpensesContextProvider.');
  }
  return context;
}
