import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

function MetaItem({ meta, onDelete, onToggleComplete }) {
  return (
    <View style={styles.item}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: meta.concluida }}
        accessibilityLabel={`Marcar ${meta.texto}`}
        android_ripple={{ color: '#dce8e4' }}
        style={({ pressed }) => [styles.goalButton, pressed && styles.pressed]}
        onPress={() => onToggleComplete(meta.id)}
      >
        <View style={[styles.checkbox, meta.concluida && styles.checkboxChecked]}>
          {meta.concluida ? <Text style={styles.checkmark}>✓</Text> : null}
        </View>
        <View style={styles.textBlock}>
          <Text style={[styles.goalText, meta.concluida && styles.completedText]}>{meta.texto}</Text>
          <Text style={styles.dateText}>
            Criada em {new Date(meta.criadaEm).toLocaleDateString('pt-BR')}
          </Text>
        </View>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Remover ${meta.texto}`}
        android_ripple={{ color: '#f0c7b8' }}
        style={({ pressed }) => [styles.deleteButton, pressed && styles.deletePressed]}
        onPress={() => onDelete(meta.id)}
      >
        <Text style={styles.deleteText}>Remover</Text>
      </Pressable>
    </View>
  );
}

export default function MetaList({ metas, onDelete, onToggleComplete }) {
  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MetaItem meta={item} onDelete={onDelete} onToggleComplete={onToggleComplete} />
      )}
      contentContainerStyle={metas.length === 0 ? styles.emptyContainer : styles.listContent}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Sua lista esta pronta.</Text>
          <Text style={styles.emptyText}>Adicione uma meta para acompanhar seu semestre.</Text>
        </View>
      }
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 90,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  emptyTitle: {
    color: '#173b4d',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  emptyText: {
    color: '#62727a',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ded8cb',
    borderRadius: 12,
    backgroundColor: '#fffdf8',
  },
  goalButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.7,
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#8a9699',
    borderRadius: 7,
  },
  checkboxChecked: {
    borderColor: '#2f7766',
    backgroundColor: '#2f7766',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  textBlock: {
    flex: 1,
  },
  goalText: {
    color: '#173b4d',
    fontSize: 15,
    lineHeight: 20,
  },
  completedText: {
    color: '#7c8889',
    textDecorationLine: 'line-through',
  },
  dateText: {
    color: '#8a9699',
    fontSize: 11,
    marginTop: 3,
  },
  deleteButton: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 7,
    overflow: 'hidden',
  },
  deletePressed: {
    backgroundColor: '#f5ddd4',
  },
  deleteText: {
    color: '#b65032',
    fontSize: 12,
    fontWeight: '800',
  },
});
