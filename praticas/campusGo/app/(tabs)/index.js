import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import FadeIn from '../../components/FadeIn';
import { useNotices } from '../../hooks/useNotices';
import api from '../../services/api';

function NoticeCard({ notice }) {
  return (
    <FadeIn style={styles.noticeCard}>
      <Text style={styles.noticeTitle}>{notice.title}</Text>
      <Text style={styles.noticeBody}>{notice.body}</Text>
    </FadeIn>
  );
}

export default function HomeScreen() {
  const { notices, isLoading, error, reload } = useNotices();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const createNotice = async () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert('Aviso incompleto', 'Informe o título e o texto para criar um aviso.');
      return;
    }

    setIsCreating(true);
    try {
      const createdNotice = await api.create('posts', {
        title: title.trim(),
        body: body.trim(),
        userId: 1,
      });
      Alert.alert(
        'Aviso enviado',
        `O JSONPlaceholder retornou o ID ${createdNotice.id}. A criação é simulada e não é salva permanentemente.`
      );
      setTitle('');
      setBody('');
    } catch (requestError) {
      console.error('Não foi possível criar o aviso.', requestError);
      Alert.alert('Erro ao criar aviso', requestError.message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Início</Text>
      <Text style={styles.subtitle}>Mural de avisos do CampusGo</Text>

      <View style={styles.createCard}>
        <Text style={styles.sectionTitle}>Criar aviso de teste</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Título do aviso"
          accessibilityLabel="Título do aviso"
        />
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={body}
          onChangeText={setBody}
          placeholder="Escreva o aviso"
          multiline
          accessibilityLabel="Texto do aviso"
        />
        <Pressable
          style={[styles.primaryButton, isCreating && styles.disabledButton]}
          onPress={createNotice}
          disabled={isCreating}
        >
          <Text style={styles.buttonText}>{isCreating ? 'Enviando...' : 'Publicar aviso de teste'}</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Avisos recentes</Text>
      {isLoading ? (
        <View style={styles.stateContainer} accessibilityRole="progressbar">
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.stateText}>Carregando avisos...</Text>
        </View>
      ) : error ? (
        <View style={styles.stateContainer}>
          <Ionicons name="cloud-offline-outline" size={40} color="#dc2626" />
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.primaryButton} onPress={reload}>
            <Text style={styles.buttonText}>Tentar novamente</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={notices}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <NoticeCard notice={item} />}
          contentContainerStyle={notices.length ? styles.listContent : styles.emptyList}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={reload} tintColor="#2563eb" />}
          ListEmptyComponent={<Text style={styles.stateText}>Não existem avisos disponíveis.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 32,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    marginTop: 4,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 10,
  },
  createCard: {
    padding: 14,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  input: {
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    color: '#0f172a',
    backgroundColor: '#fff',
  },
  multilineInput: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  primaryButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#2563eb',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  stateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 24,
  },
  stateText: {
    color: '#475569',
    fontSize: 15,
    textAlign: 'center',
  },
  errorText: {
    color: '#991b1b',
    fontSize: 15,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyList: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noticeCard: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  noticeTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  noticeBody: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569',
  },
});
