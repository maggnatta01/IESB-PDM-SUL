import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';
import {
  botaoAdicionar,
  listaVazia,
  placeholderCompromisso,
  tituloApp,
  tituloLista,
} from './labels';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [textoCompromisso, setTextoCompromisso] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregamentoConcluido, setCarregamentoConcluido] = useState(false);

  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (dadosSalvos) {
          setCompromissos(JSON.parse(dadosSalvos));
        }
      } catch (error) {
        Alert.alert('Erro ao carregar', 'Nao foi possivel recuperar seus compromissos.');
      } finally {
        setCarregamentoConcluido(true);
      }
    }

    carregarCompromissos();
  }, []);

  useEffect(() => {
    if (!carregamentoConcluido) {
      return;
    }

    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (error) {
        Alert.alert('Erro ao salvar', 'Nao foi possivel salvar seus compromissos.');
      }
    }

    salvarCompromissos();
  }, [compromissos, carregamentoConcluido]);

  function adicionarCompromisso() {
    const textoLimpo = textoCompromisso.trim();

    if (!textoLimpo) {
      Alert.alert('Compromisso vazio', 'Digite um compromisso antes de adicionar.');
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadoEm: new Date().toISOString(),
    };

    setCompromissos((atuais) => [...atuais, novoCompromisso]);
    setTextoCompromisso('');
  }

  function removerCompromisso(id) {
    setCompromissos((atuais) => atuais.filter((item) => item.id !== id));
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image source={require('./assets/logo.png')} style={styles.logo} />
            <View style={styles.headerText}>
              <Text style={styles.kicker}>IESB / ROTINA ACADEMICA</Text>
              <Text style={styles.title}>{tituloApp}</Text>
              <Text style={styles.subtitle}>Organize o que importa no seu dia.</Text>
            </View>
          </View>

          <CompromissoInput
            value={textoCompromisso}
            onChangeText={setTextoCompromisso}
            onAdd={adicionarCompromisso}
            labels={{ placeholderCompromisso, botaoAdicionar }}
          />

          <CompromissoList
            itens={compromissos}
            onDelete={removerCompromisso}
            tituloLista={tituloLista}
            listaVazia={listaVazia}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f1ea',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 26,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 14,
    borderRadius: 16,
  },
  headerText: {
    flex: 1,
  },
  kicker: {
    color: '#b45e3d',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  title: {
    color: '#173b4d',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 2,
  },
  subtitle: {
    color: '#68767a',
    fontSize: 13,
    marginTop: 4,
  },
});
