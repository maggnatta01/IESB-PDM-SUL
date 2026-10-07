import { StyleSheet, Text, View } from 'react-native';

export default function DespesasRecentes() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Despesas Recentes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f7f5',
  },
  title: {
    color: '#173d35',
    fontSize: 22,
    fontWeight: '600',
  },
});