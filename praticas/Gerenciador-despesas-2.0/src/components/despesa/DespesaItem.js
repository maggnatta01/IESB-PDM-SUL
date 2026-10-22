import { Ionicons } from '@expo/vector-icons';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});
const categoryIcons = {
  Alimentação: 'restaurant-outline',
  Transporte: 'bus-outline',
  Lazer: 'ticket-outline',
  Moradia: 'home-outline',
  Saúde: 'medkit-outline',
  Outros: 'ellipsis-horizontal-circle-outline',
};

export default function DespesaItem({ expense, onPress, theme }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Editar ${expense.description}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          ...Platform.select({
            ios: {
              shadowColor: theme.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.12,
              shadowRadius: 5,
            },
            android: { elevation: 2 },
            default: {},
          }),
        },
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.icon, { backgroundColor: theme.muted }]}>
        <Ionicons name={categoryIcons[expense.category] ?? categoryIcons.Outros} size={20} color={theme.primary} />
      </View>
      <View style={styles.details}>
        <Text numberOfLines={1} style={[styles.description, { color: theme.text }]}>
          {expense.description}
        </Text>
        <Text style={[styles.category, { color: theme.secondaryText }]}>
          {expense.category}
        </Text>
      </View>
      <Text style={[styles.amount, { color: theme.text }]}>
        {currencyFormatter.format(Number(expense.amount))}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 78,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    marginVertical: 5,
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
  },
  pressed: {
    opacity: 0.8,
  },
  icon: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
  },
  details: {
    flex: 1,
    gap: 4,
  },
  description: {
    fontSize: 15,
    fontWeight: '600',
  },
  category: {
    fontSize: 12,
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
});
