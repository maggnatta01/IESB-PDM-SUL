import { StyleSheet, Text, View } from 'react-native';
import despesasUtils from '../utils/despesas';

const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export default function DespesasSumario({ despesas }) {
  const total = despesasUtils.calcularTotal(despesas);

  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>Total exibido</Text>
      <Text style={styles.valor}>{formatadorMoeda.format(total)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dce4df',
  },
  rotulo: {
    color: '#52615a',
    fontSize: 15,
  },
  valor: {
    color: '#175e4b',
    fontSize: 19,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
});