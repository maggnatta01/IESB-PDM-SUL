import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function StorageError({ message, onRetry, theme }) {
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.message, { color: theme.error }]}>{message}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={onRetry}
        style={[styles.button, { backgroundColor: theme.primary }]}
      >
        <Text style={[styles.buttonText, { color: theme.onPrimary }]}>Tentar novamente</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 24,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: '700',
  },
});
