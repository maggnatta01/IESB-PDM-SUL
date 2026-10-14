import { Pressable, StyleSheet, Text, View } from 'react-native';

import despesasUtils from '../utils/despesas';

export const CATEGORIAS = despesasUtils.CATEGORIAS;

export default function CategoriaSelector({
  selecionada,
  onSelecionar,
  incluirTodas = false,
}) {
  const opcoes = incluirTodas ? ['Todas', ...CATEGORIAS] : CATEGORIAS;

  return (
    <View style={styles.container}>
      {opcoes.map((categoria) => {
        const ativa = selecionada === categoria;

        return (
          <Pressable
            key={categoria}
            accessibilityRole="button"
            accessibilityState={{ selected: ativa }}
            onPress={() => onSelecionar(categoria)}
            style={[styles.opcao, ativa && styles.opcaoAtiva]}
          >
            <Text style={[styles.texto, ativa && styles.textoAtivo]}>
              {categoria}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  opcao: {
    minHeight: 40,
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#c8d3ce',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  opcaoAtiva: {
    borderColor: '#175e4b',
    backgroundColor: '#175e4b',
  },
  texto: {
    color: '#33413b',
    fontSize: 14,
    fontWeight: '500',
  },
  textoAtivo: {
    color: '#fff',
  },
});