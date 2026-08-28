import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ADD_BUTTON_LABEL,
  APP_TITLE,
  DISCIPLINE_PLACEHOLDER,
  DISCIPLINES_TITLE,
  REQUIRED_ONLY_LABEL,
} from './labels';

const disciplines = [
  'Programação para Dispositivos Móveis',
  'Banco de Dados',
  'Engenharia de Software',
  'Desenvolvimento Web',
];

export default function App() {
  const [disciplineName, setDisciplineName] = useState('');
  const [showRequiredOnly, setShowRequiredOnly] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{APP_TITLE}</Text>

        <View style={styles.formRow}>
          <TextInput
            style={styles.input}
            placeholder={DISCIPLINE_PLACEHOLDER}
            value={disciplineName}
            onChangeText={setDisciplineName}
          />
          <Pressable
            style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
            onPress={() => setDisciplineName('')}
          >
            <Text style={styles.addButtonText}>{ADD_BUTTON_LABEL}</Text>
          </Pressable>
        </View>

        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>{REQUIRED_ONLY_LABEL}</Text>
          <Switch value={showRequiredOnly} onValueChange={setShowRequiredOnly} />
        </View>

        <Text style={styles.sectionTitle}>{DISCIPLINES_TITLE}</Text>
        <View style={styles.disciplineList}>
          {disciplines.map((discipline) => (
            <View key={discipline} style={styles.disciplineItem}>
              <Text style={styles.disciplineText}>{discipline}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '6%',
    backgroundColor: '#f5f7fb',
  },
  content: {
    flex: 1,
    // Organiza o conteúdo no eixo principal vertical, começando pelo cabeçalho.
    justifyContent: 'flex-start',
    // Estica os filhos no eixo transversal para ocuparem a largura disponível.
    alignItems: 'stretch',
  },
  title: {
    color: '#17324d',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#9aaabd',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 12,
    fontSize: 15,
  },
  addButton: {
    width: '28%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#176b87',
    borderRadius: 8,
    padding: 12,
  },
  addButtonPressed: {
    backgroundColor: '#0f4d63',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  filterLabel: {
    color: '#35495e',
    fontSize: 15,
  },
  sectionTitle: {
    color: '#17324d',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  disciplineList: {
    flex: 1,
  },
  disciplineItem: {
    margin: 5,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#e07a5f',
  },
  disciplineText: {
    color: '#26384a',
    fontSize: 16,
  },
});
