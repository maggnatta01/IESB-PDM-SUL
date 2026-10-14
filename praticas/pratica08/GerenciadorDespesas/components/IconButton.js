import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

export default function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Adicionar despesa"
      onPress={onPress}
      style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  pressionado: {
    opacity: 0.5,
  },
});