import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

import { scheduleReminder } from '../../services/notifications';
import { getCurrentPlace } from '../../services/location';

export default function TasksScreen() {
  const handleOpenNewTask = () => {
    router.push('/new-task');
  };

  const handleOpenExampleTask = () => {
    router.push({
      pathname: '/task/[id]',
      params: { id: '42' },
    });
  };

  const handleStudyHere = () => {
    getCurrentPlace().then((place) => {
      Alert.alert(
        place ? 'Check-in realizado' : 'Localização indisponível',
        place
          ? `Você estudou aqui: ${place.label}`
          : 'Não foi possível obter sua localização. Verifique a permissão e tente novamente.'
      );
    });
  };

  const handleReminder = async () => {
    const scheduled = await scheduleReminder('Lembrete do CampusGo', 10);

    Alert.alert(
      scheduled ? 'Lembrete agendado' : 'Permissão necessária',
      scheduled
        ? 'Seu lembrete foi programado com sucesso.'
        : 'Conceda permissão para notificações para ativar o lembrete.'
    );
  };

  const handleComplete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      .catch((error) => {
        console.warn('O dispositivo não conseguiu executar o feedback tátil.', error);
      })
      .finally(() => {
        Alert.alert('Tarefa concluída');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <Pressable style={styles.primaryButton} onPress={handleOpenNewTask}>
        <Text style={styles.buttonText}>Nova tarefa</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={handleOpenExampleTask}>
        <Text style={styles.secondaryButtonText}>Abrir tarefa de exemplo</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={handleStudyHere}>
        <Text style={styles.secondaryButtonText}>Estudei aqui</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={handleReminder}>
        <Text style={styles.secondaryButtonText}>Lembrar em 10 s</Text>
      </Pressable>

      <Pressable style={styles.successButton} onPress={handleComplete}>
        <Text style={styles.buttonText}>Concluir</Text>
      </Pressable>
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
  primaryButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  successButton: {
    backgroundColor: '#16a34a',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#0f172a',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});
