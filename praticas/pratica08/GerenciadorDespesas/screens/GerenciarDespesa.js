import { useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CategoriaSelector from '../components/CategoriaSelector';
import { DespesasContext } from '../components/DespesasContext';
import despesasUtils from '../utils/despesas';

export default function GerenciarDespesa({ navigation }) {
  const { adicionarDespesa } = useContext(DespesasContext);
  const [titulo, setTitulo] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [erros, setErros] = useState({});

  function salvarDespesa() {
    const novosErros = despesasUtils.validarDespesa({ titulo, valor, categoria });

    setErros(novosErros);
    if (Object.values(novosErros).some(Boolean)) return;

    const valorNumerico = despesasUtils.converterValor(valor);
    adicionarDespesa({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      titulo: titulo.trim(),
      valor: valorNumerico,
      categoria,
      data: new Date().toISOString(),
    });
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={styles.flexivel}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.rotulo}>Descrição</Text>
        <TextInput
          accessibilityLabel="Descrição da despesa"
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex.: conta de energia"
          placeholderTextColor="#77847d"
          style={styles.campo}
          returnKeyType="next"
        />
        {erros.titulo ? <Text style={styles.erro}>{erros.titulo}</Text> : null}

        <Text style={styles.rotulo}>Valor (R$)</Text>
        <TextInput
          accessibilityLabel="Valor da despesa em reais"
          value={valor}
          onChangeText={setValor}
          placeholder="0,00"
          placeholderTextColor="#77847d"
          keyboardType="decimal-pad"
          style={styles.campo}
        />
        {erros.valor ? <Text style={styles.erro}>{erros.valor}</Text> : null}

        <Text style={styles.rotulo}>Categoria</Text>
        <CategoriaSelector selecionada={categoria} onSelecionar={setCategoria} />
        {erros.categoria ? <Text style={styles.erro}>{erros.categoria}</Text> : null}

        <Pressable
          accessibilityRole="button"
          onPress={salvarDespesa}
          style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
        >
          <Text style={styles.textoBotao}>Salvar despesa</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flexivel: {
    flex: 1,
    backgroundColor: '#f5f7f5',
  },
  container: {
    gap: 10,
    padding: 20,
    paddingBottom: 36,
  },
  rotulo: {
    marginTop: 8,
    color: '#33413b',
    fontSize: 14,
    fontWeight: '600',
  },
  campo: {
    minHeight: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#c8d3ce',
    borderRadius: 6,
    backgroundColor: '#fff',
    color: '#23322b',
    fontSize: 16,
  },
  erro: {
    color: '#a34431',
    fontSize: 13,
  },
  botao: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 6,
    backgroundColor: '#175e4b',
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});