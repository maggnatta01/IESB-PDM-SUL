import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function CompromissoInput({ value, onChangeText, onAdd, labels }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>NOVO COMPROMISSO</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder={labels.placeholderCompromisso}
          placeholderTextColor="#899598"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onAdd}
          returnKeyType="done"
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={labels.botaoAdicionar}
          android_ripple={{ color: '#d77a54' }}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={onAdd}
        >
          <Text style={styles.buttonText}>{labels.botaoAdicionar}</Text>
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
    color: '#68767a',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '68%',
    minHeight: 50,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#c9c3b8',
    borderRadius: 10,
    backgroundColor: '#fffdf8',
    color: '#173b4d',
    fontSize: 14,
  },
  button: {
    width: '29%',
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#c8653f',
    overflow: 'hidden',
  },
  buttonPressed: {
    backgroundColor: '#a95031',
  },
  buttonText: {
    color: '#fffaf2',
    fontSize: 14,
    fontWeight: '800',
  },
});
