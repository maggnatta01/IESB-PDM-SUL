import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { CATEGORIES } from '../constants/categories';
import { THEMES } from '../constants/theme';
import StorageError from '../components/despesa/StorageError';
import { useExpenses } from '../store/expenses-context';
import { AMOUNT_PATTERN, toLocalDate, validate } from '../utils/expenses';

const initialForm = {
  description: '',
  amount: '',
  date: '',
  category: '',
};

function formatDateInput(value) {
  if (!value) return '';
  const date = toLocalDate(value);
  if (!date) return '';
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

export default function GerenciarDespesa({ navigation, route }) {
  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);
  const {
    expenses,
    isLoaded,
    loadError,
    retryLoad,
    addExpense,
    updateExpense,
    deleteExpense,
  } = useExpenses();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const theme = THEMES[colorScheme === 'dark' ? 'dark' : 'light'];
  const existingExpense = isEditing ? expenses.find((expense) => expense.id === expenseId) : null;

  useEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Editar despesa' : 'Nova despesa' });
  }, [isEditing, navigation]);

  useEffect(() => {
    if (!isLoaded) return;
    if (isEditing && !existingExpense) {
      Alert.alert('Despesa não encontrada', 'Ela pode ter sido removida em outra tela.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
      return;
    }
    if (existingExpense) {
      setForm({
        description: existingExpense.description,
        amount: String(existingExpense.amount),
        date: formatDateInput(existingExpense.date),
        category: existingExpense.category,
      });
    } else {
      setForm(initialForm);
    }
  }, [existingExpense, isEditing, isLoaded, navigation]);

  function handleChange(field, value) {
    if (field === 'amount' && !AMOUNT_PATTERN.test(value)) return;

    const nextForm = { ...form, [field]: value };
    setForm(nextForm);
    const fieldError = validate(nextForm)[field];
    setErrors((previousErrors) => {
      if (!fieldError) {
        const nextErrors = { ...previousErrors };
        delete nextErrors[field];
        return nextErrors;
      }
      return { ...previousErrors, [field]: fieldError };
    });
  }

  function saveExpense() {
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    const expense = {
      id: isEditing ? expenseId : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      description: form.description.trim(),
      amount: Number.parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) updateExpense(expense);
    else addExpense(expense);
    navigation.goBack();
  }

  function confirmDelete() {
    Alert.alert(
      'Excluir despesa?',
      'Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            deleteExpense(expenseId);
            navigation.goBack();
          },
        },
      ],
    );
  }

  function renderFieldError(field) {
    return errors[field]
      ? <Text accessibilityRole="alert" style={[styles.error, { color: theme.error }]}>{errors[field]}</Text>
      : null;
  }

  if (!isLoaded || (isEditing && !existingExpense)) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.background }]}>
        <ActivityIndicator color={theme.primary} />
      </View>
    );
  }

  if (loadError) {
    return <StorageError message={loadError} onRetry={retryLoad} theme={theme} />;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
      >
        <Text style={[styles.label, { color: theme.text }]}>Descrição</Text>
        <TextInput
          accessibilityLabel="Descrição da despesa"
          value={form.description}
          onChangeText={(value) => handleChange('description', value)}
          placeholder="Ex.: almoço"
          placeholderTextColor={theme.secondaryText}
          returnKeyType="next"
          style={[
            styles.input,
            { backgroundColor: theme.field, borderColor: errors.description ? theme.error : theme.border, color: theme.text },
          ]}
        />
        {renderFieldError('description')}

        <Text style={[styles.label, { color: theme.text }]}>Valor (R$)</Text>
        <TextInput
          accessibilityLabel="Valor da despesa em reais"
          value={form.amount}
          onChangeText={(value) => handleChange('amount', value)}
          placeholder="0.00"
          placeholderTextColor={theme.secondaryText}
          keyboardType="decimal-pad"
          style={[
            styles.input,
            { backgroundColor: theme.field, borderColor: errors.amount ? theme.error : theme.border, color: theme.text },
          ]}
        />
        {renderFieldError('amount')}

        <Text style={[styles.label, { color: theme.text }]}>Data</Text>
        <TextInput
          accessibilityLabel="Data da despesa"
          value={form.date}
          onChangeText={(value) => handleChange('date', value)}
          placeholder="AAAA-MM-DD"
          placeholderTextColor={theme.secondaryText}
          keyboardType="numbers-and-punctuation"
          maxLength={10}
          style={[
            styles.input,
            { backgroundColor: theme.field, borderColor: errors.date ? theme.error : theme.border, color: theme.text },
          ]}
        />
        {renderFieldError('date')}

        <Text style={[styles.label, { color: theme.text }]}>Categoria</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={form.category ? `Categoria: ${form.category}` : 'Selecionar categoria'}
          onPress={() => setCategoryModalVisible(true)}
          style={[
            styles.categoryButton,
            { backgroundColor: theme.field, borderColor: errors.category ? theme.error : theme.border },
          ]}
        >
          <Text style={{ color: form.category ? theme.text : theme.secondaryText }}>
            {form.category || 'Selecione uma categoria'}
          </Text>
          <Ionicons name="chevron-down" size={20} color={theme.secondaryText} />
        </Pressable>
        {renderFieldError('category')}

        <Pressable
          accessibilityRole="button"
          onPress={saveExpense}
          style={({ pressed }) => [
            styles.saveButton,
            { backgroundColor: theme.primary },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.saveText, { color: theme.onPrimary }]}>
            {isEditing ? 'Salvar alterações' : 'Salvar despesa'}
          </Text>
        </Pressable>
        {isEditing ? (
          <Pressable
            accessibilityRole="button"
            onPress={confirmDelete}
            style={({ pressed }) => [
              styles.deleteButton,
              { borderColor: theme.error },
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.deleteText, { color: theme.error }]}>Excluir despesa</Text>
          </Pressable>
        ) : null}
      </ScrollView>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isCategoryModalVisible}
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: theme.surface }]}>
            <View style={styles.modalHeading}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Selecione a categoria</Text>
              <Pressable
                accessibilityLabel="Fechar seleção de categoria"
                onPress={() => setCategoryModalVisible(false)}
              >
                <Ionicons name="close" size={24} color={theme.text} />
              </Pressable>
            </View>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                accessibilityRole="button"
                onPress={() => {
                  handleChange('category', category);
                  setCategoryModalVisible(false);
                }}
                style={[styles.categoryOption, { borderBottomColor: theme.border }]}
              >
                <Text style={[styles.optionText, { color: theme.text }]}>{category}</Text>
                {form.category === category ? (
                  <Ionicons name="checkmark" size={21} color={theme.primary} />
                ) : null}
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    gap: 8,
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    minHeight: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  error: {
    marginTop: -2,
    fontSize: 13,
  },
  categoryButton: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  saveButton: {
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    borderRadius: 8,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '700',
  },
  deleteButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 8,
  },
  deleteText: {
    fontSize: 15,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.78,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
  },
  modalCard: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  categoryOption: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 16,
  },
});
