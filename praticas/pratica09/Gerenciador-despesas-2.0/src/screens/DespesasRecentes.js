import {
  ActivityIndicator,
  StyleSheet,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import DespesaLista from '../components/despesa/DespesaLista';
import StorageError from '../components/despesa/StorageError';
import { THEMES } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';
import { getRecentExpenses } from '../utils/expenses';

export default function DespesasRecentes({ navigation }) {
  const { expenses, isLoaded, loadError, retryLoad } = useExpenses();
  const colorScheme = useColorScheme();
  const theme = THEMES[colorScheme === 'dark' ? 'dark' : 'light'];
  const { width } = useWindowDimensions();
  const recentExpenses = getRecentExpenses(expenses);

  if (!isLoaded) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.background }]}>
        <ActivityIndicator color={theme.primary} />
      </View>
    );
  }

  if (loadError) {
    return <StorageError message={loadError} onRetry={retryLoad} theme={theme} />;
  }

  return (
    <DespesaLista
      expenses={recentExpenses}
      navigation={navigation}
      theme={theme}
      numColumns={width > 600 ? 2 : 1}
      emptyMessage="Nenhuma despesa nos últimos sete dias. Toque em + para adicionar."
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
