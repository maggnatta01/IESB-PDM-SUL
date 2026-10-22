import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import DespesaLista from '../components/despesa/DespesaLista';
import StorageError from '../components/despesa/StorageError';
import { CATEGORIES } from '../constants/categories';
import { THEMES } from '../constants/theme';
import useDebounce from '../hooks/useDebounce';
import { useExpenses } from '../store/expenses-context';

export default function TodasDespesas({ navigation }) {
  const { expenses, isLoaded, loadError, retryLoad, setExpenses } = useExpenses();
  const colorScheme = useColorScheme();
  const theme = THEMES[colorScheme === 'dark' ? 'dark' : 'light'];
  const { width } = useWindowDimensions();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const filteredExpenses = useMemo(() => {
    const normalizedSearch = debouncedSearchTerm.trim().toLowerCase();
    return expenses.filter((expense) => {
      const matchesDescription = expense.description.toLowerCase().includes(normalizedSearch);
      const matchesCategory = !selectedCategory || expense.category === selectedCategory;
      return matchesDescription && matchesCategory;
    });
  }, [debouncedSearchTerm, expenses, selectedCategory]);

  function confirmClearExpenses() {
    Alert.alert(
      'Limpar todas as despesas?',
      'Essa ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar tudo', style: 'destructive', onPress: () => setExpenses([]) },
      ],
    );
  }

  const listHeader = (
    <View style={styles.header}>
      <View style={[styles.searchField, { backgroundColor: theme.field, borderColor: theme.border }]}>
        <Ionicons name="search-outline" size={20} color={theme.secondaryText} />
        <TextInput
          accessibilityLabel="Pesquisar despesas por descrição"
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Pesquisar descrição"
          placeholderTextColor={theme.secondaryText}
          returnKeyType="search"
          style={[styles.searchInput, { color: theme.text }]}
        />
        {searchTerm ? (
          <Pressable accessibilityLabel="Limpar pesquisa" onPress={() => setSearchTerm('')}>
            <Ionicons name="close-circle" size={20} color={theme.secondaryText} />
          </Pressable>
        ) : null}
      </View>
      <Text style={[styles.filterLabel, { color: theme.secondaryText }]}>Categoria</Text>
      <View style={styles.categories}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: selectedCategory === null }}
          onPress={() => setSelectedCategory(null)}
          style={[
            styles.chip,
            { borderColor: theme.border, backgroundColor: theme.surface },
            selectedCategory === null && { borderColor: theme.primary, backgroundColor: theme.primary },
          ]}
        >
          <Text style={[
            styles.chipText,
            { color: selectedCategory === null ? theme.onPrimary : theme.text },
          ]}>
            Todas
          </Text>
        </Pressable>
        {CATEGORIES.map((category) => {
          const selected = selectedCategory === category;
          return (
            <Pressable
              key={category}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setSelectedCategory(selected ? null : category)}
              style={[
                styles.chip,
                { borderColor: theme.border, backgroundColor: theme.surface },
                selected && { borderColor: theme.primary, backgroundColor: theme.primary },
              ]}
            >
              <Text style={[styles.chipText, { color: selected ? theme.onPrimary : theme.text }]}>
                {category}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {expenses.length > 0 ? (
        <Pressable accessibilityRole="button" onPress={confirmClearExpenses} style={styles.clearButton}>
          <Text style={[styles.clearText, { color: theme.error }]}>Limpar tudo</Text>
        </Pressable>
      ) : null}
    </View>
  );

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
      expenses={filteredExpenses}
      navigation={navigation}
      theme={theme}
      numColumns={width > 600 ? 2 : 1}
      header={listHeader}
      emptyMessage={
        expenses.length === 0
          ? 'Nenhuma despesa. Toque em + para adicionar.'
          : 'Nenhuma despesa corresponde à busca ou ao filtro.'
      }
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingTop: 16,
  },
  searchField: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    minHeight: 46,
    fontSize: 16,
  },
  filterLabel: {
    marginTop: 14,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '600',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  chip: {
    minHeight: 34,
    justifyContent: 'center',
    paddingHorizontal: 11,
    borderWidth: 1,
    borderRadius: 18,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  clearButton: {
    alignSelf: 'flex-end',
    paddingTop: 10,
  },
  clearText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
