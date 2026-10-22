import { StyleSheet, Text, View } from 'react-native';
import { calculateTotal } from '../../utils/expenses';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export default function DespesaSumario({ expenses, theme }) {
  const total = calculateTotal(expenses);

  return (
    <View style={[styles.container, { borderBottomColor: theme.border }]}>
      <Text style={[styles.label, { color: theme.secondaryText }]}>
        {expenses.length} {expenses.length === 1 ? 'despesa' : 'despesas'}
      </Text>
      <Text style={[styles.total, { color: theme.primary }]}>
        {currencyFormatter.format(total)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: 15,
  },
  total: {
    fontSize: 19,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
});
