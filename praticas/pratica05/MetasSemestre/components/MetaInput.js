import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>NOVA META</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Ex.: concluir o trabalho de banco de dados"
          placeholderTextColor="#8a9699"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onAdd}
          returnKeyType="done"
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Adicionar meta"
          android_ripple={{ color: '#d5744a' }}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={onAdd}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  label: {
    color: '#62727a',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 50,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#c8c3b8',
    borderRadius: 10,
    backgroundColor: '#fffdf8',
    color: '#173b4d',
    fontSize: 14,
  },
  button: {
    minHeight: 50,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#c9643d',
    overflow: 'hidden',
  },
  buttonPressed: {
    backgroundColor: '#a94e30',
  },
  buttonText: {
    color: '#fffaf2',
    fontSize: 14,
    fontWeight: '800',
  },
});
