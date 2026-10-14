import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CategoriaSelector from './CategoriaSelector';
import DespesaItem from './DespesaItem';
import DespesasSumario from './DespesasSumario';
import despesasUtils from '../utils/despesas';

export default function ListaDespesas({ despesas }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');
  const despesasFiltradas = despesasUtils.filtrarDespesas(despesas, categoriaSelecionada);

  return (
    <View style={styles.container}>
      <Text style={styles.rotuloFiltro}>Categoria</Text>
      <CategoriaSelector
        selecionada={categoriaSelecionada}
        onSelecionar={setCategoriaSelecionada}
        incluirTodas
      />
      <FlatList
        data={despesasFiltradas}
        keyExtractor={(despesa) => despesa.id}
        renderItem={({ item }) => <DespesaItem despesa={item} />}
        ListHeaderComponent={<DespesasSumario despesas={despesasFiltradas} />}
        ListEmptyComponent={(
          <Text style={styles.vazio}>
            Nenhuma despesa encontrada nesta categoria.
          </Text>
        )}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
    backgroundColor: '#f5f7f5',
  },
  rotuloFiltro: {
    marginBottom: 10,
    color: '#52615a',
    fontSize: 13,
    fontWeight: '600',
  },
  lista: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  vazio: {
    paddingVertical: 32,
    color: '#68756e',
    fontSize: 15,
    textAlign: 'center',
  },
});