import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [textoMeta, setTextoMeta] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregamentoConcluido, setCarregamentoConcluido] = useState(false);

  useEffect(() => {
    async function carregarMetas() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (dadosSalvos) {
          setMetas(JSON.parse(dadosSalvos));
        }
      } catch (error) {
        Alert.alert('Nao foi possivel carregar', 'Tente abrir o aplicativo novamente.');
      } finally {
        setCarregamentoConcluido(true);
      }
    }

    carregarMetas();
  }, []);

  useEffect(() => {
    if (!carregamentoConcluido) {
      return;
    }

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (error) {
        Alert.alert('Nao foi possivel salvar', 'Suas metas nao puderam ser persistidas.');
      }
    }

    salvarMetas();
  }, [metas, carregamentoConcluido]);

  function adicionarMeta() {
    const textoLimpo = textoMeta.trim();

    if (!textoLimpo) {
      Alert.alert('Meta vazia', 'Digite uma meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    setMetas((metasAtuais) => [...metasAtuais, novaMeta]);
    setTextoMeta('');
  }

  function removerMeta(id) {
    setMetas((metasAtuais) => metasAtuais.filter((meta) => meta.id !== id));
  }

  function alternarConclusao(id) {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta,
      ),
    );
  }

  const metasConcluidas = metas.filter((meta) => meta.concluida).length;
  const metasPendentes = metas.length - metasConcluidas;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image source={require('./assets/icon.png')} style={styles.logo} />
            <View>
              <Text style={styles.eyebrow}>PLANEJAMENTO ACADEMICO</Text>
              <Text style={styles.title}>MetasSemestre</Text>
              <Text style={styles.counter}>
                {metasPendentes} pendentes / {metasConcluidas} concluidas
              </Text>
            </View>
          </View>

          <MetaInput value={textoMeta} onChangeText={setTextoMeta} onAdd={adicionarMeta} />
          <MetaList metas={metas} onDelete={removerMeta} onToggleComplete={alternarConclusao} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f4ed',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
  },
  logo: {
    width: 58,
    height: 58,
    marginRight: 14,
    borderRadius: 16,
  },
  eyebrow: {
    color: '#b65f3c',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  title: {
    color: '#173b4d',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 2,
  },
  counter: {
    color: '#62727a',
    fontSize: 13,
    marginTop: 3,
  },
});
