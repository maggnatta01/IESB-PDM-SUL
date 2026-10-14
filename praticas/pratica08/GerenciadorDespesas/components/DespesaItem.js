import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

const aparenciaCategoria = {
  Alimentação: { icone: 'restaurant-outline', cor: '#a34431', fundo: '#f8e8e2' },
  Transporte: { icone: 'bus-outline', cor: '#315d91', fundo: '#e7eff8' },
  Lazer: { icone: 'ticket-outline', cor: '#8a5b12', fundo: '#f8f0dc' },
  Outros: { icone: 'ellipsis-horizontal-circle-outline', cor: '#52615a', fundo: '#e9eeeb' },
};

const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export default function DespesaItem({ despesa }) {
  const aparencia = aparenciaCategoria[despesa.categoria] ?? aparenciaCategoria.Outros;

  return (
    <View style={styles.container}>
      <View style={[styles.icone, { backgroundColor: aparencia.fundo }]}>
        <Ionicons name={aparencia.icone} size={19} color={aparencia.cor} />
      </View>
      <View style={styles.detalhes}>
        <Text style={styles.titulo} numberOfLines={1}>
          {despesa.titulo}
        </Text>
        <Text style={[styles.categoria, { color: aparencia.cor }]}>
          {despesa.categoria}
        </Text>
      </View>
      <Text style={styles.valor}>{formatadorMoeda.format(Number(despesa.valor))}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5ebe7',
  },
  icone: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
  },
  detalhes: {
    flex: 1,
    gap: 4,
  },
  titulo: {
    color: '#23322b',
    fontSize: 15,
    fontWeight: '600',
  },
  categoria: {
    fontSize: 12,
    fontWeight: '600',
  },
  valor: {
    color: '#23322b',
    fontSize: 14,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
});