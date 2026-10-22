import { Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import DespesaItem from './DespesaItem';
import DespesaSumario from './DespesaSumario';

export default function DespesaLista({
  expenses,
  navigation,
  theme,
  numColumns = 1,
  header,
  emptyMessage = 'Nenhuma despesa. Toque em + para adicionar.',
}) {
  return (
    <FlatList
      key={numColumns}
      data={expenses}
      numColumns={numColumns}
      keyExtractor={(expense) => expense.id}
      columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
      renderItem={({ item }) => (
        <DespesaItem
          expense={item}
          theme={theme}
          onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: item.id })}
        />
      )}
      ListHeaderComponent={(
        <View>
          {header}
          <DespesaSumario expenses={expenses} theme={theme} />
        </View>
      )}
      ListEmptyComponent={(
        <View style={styles.empty}>
          <Ionicons name="receipt-outline" size={42} color={theme.secondaryText} />
          <Text style={[styles.emptyText, { color: theme.text }]}>{emptyMessage}</Text>
        </View>
      )}
      contentContainerStyle={[styles.content, { backgroundColor: theme.background }]}
      style={{ backgroundColor: theme.background }}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingBottom: 26,
  },
  row: {
    gap: 10,
  },
  empty: {
    alignItems: 'center',
    gap: 10,
    paddingVertical: 36,
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
  },
});
