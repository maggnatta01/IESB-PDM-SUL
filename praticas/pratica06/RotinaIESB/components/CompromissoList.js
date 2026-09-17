import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

function CompromissoItem({ item, onDelete }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>{item.texto}</Text>
        <Text style={styles.dateText}>
          Criado em {new Date(item.criadoEm).toLocaleDateString('pt-BR')}
        </Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Remover ${item.texto}`}
        android_ripple={{ color: '#f0c8b8' }}
        style={({ pressed }) => [styles.deleteButton, pressed && styles.deletePressed]}
        onPress={() => onDelete(item.id)}
      >
        <Text style={styles.deleteText}>Remover</Text>
      </Pressable>
    </View>
  );
}

export default function CompromissoList({ itens, onDelete, tituloLista, listaVazia }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{tituloLista}</Text>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CompromissoItem item={item} onDelete={onDelete} />}
        contentContainerStyle={itens.length === 0 ? styles.emptyContainer : styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{listaVazia}</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  title: {
    color: '#173b4d',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },
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
  emptyText: {
    color: '#68767a',
    fontSize: 14,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ded8cb',
    borderRadius: 12,
    backgroundColor: '#fffdf8',
  },
  itemContent: {
    flex: 1,
    paddingRight: 8,
  },
  itemText: {
    color: '#173b4d',
    fontSize: 15,
    lineHeight: 20,
  },
  dateText: {
    color: '#899598',
    fontSize: 11,
    marginTop: 4,
  },
  deleteButton: {
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
