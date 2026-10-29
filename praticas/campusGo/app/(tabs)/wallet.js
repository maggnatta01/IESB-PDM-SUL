import { Share, StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function WalletScreen() {
  const { expenses, isLoaded, loadError, retryLoad } = useExpenses();
  const total = expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Gastei R$ ${total.toFixed(2)} neste semestre.`,
      });
    } catch (error) {
      console.error('Não foi possível compartilhar o resumo do bolso.', error);
      Alert.alert('Erro', 'Não foi possível compartilhar o resumo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bolso</Text>

      {loadError ? (
        <View style={styles.card}>
          <Text style={styles.label}>{loadError}</Text>
          <Pressable onPress={retryLoad} style={styles.retryButton}>
            <Text style={styles.buttonText}>Tentar novamente</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.card}>
            <Text style={styles.label}>{isLoaded ? 'Total de despesas' : 'Carregando despesas...'}</Text>
            <Text style={styles.amount}>
              {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          </View>

          <Pressable style={styles.shareButton} onPress={handleShare} disabled={!isLoaded}>
            <Text style={styles.buttonText}>Compartilhar resumo</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  amount: {
    marginTop: 10,
    fontSize: 36,
    fontWeight: '700',
    color: '#0f172a',
  },
  shareButton: {
    backgroundColor: '#0f766e',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  retryButton: {
    backgroundColor: '#1d4ed8',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});
