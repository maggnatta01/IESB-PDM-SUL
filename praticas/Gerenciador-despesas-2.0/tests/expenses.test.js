const assert = require('node:assert/strict');
const test = require('node:test');
const expensesReducer = require('../src/store/expensesReducer');
const {
  AMOUNT_PATTERN,
  calculateTotal,
  getRecentExpenses,
  isFutureDate,
  validate,
} = require('../src/utils/expenses');

const today = new Date(2026, 9, 21, 12);

test('valida todos os campos obrigatórios e exige três caracteres na descrição', () => {
  assert.deepEqual(validate({
    description: ' ab ',
    amount: '0',
    date: '2026-10-22',
    category: '',
  }, today), {
    description: 'A descrição deve ter pelo menos três caracteres.',
    amount: 'Informe um valor maior que zero, com até duas casas decimais.',
    date: 'Informe uma data válida que não seja futura.',
    category: 'Selecione uma categoria.',
  });

  assert.deepEqual(validate({
    description: ' Almoço ',
    amount: '34.90',
    date: '2026-10-21',
    category: 'Alimentação',
  }, today), {
    description: '',
    amount: '',
    date: '',
    category: '',
  });
});

test('a máscara do valor permite somente até duas casas decimais', () => {
  for (const valid of ['', '12', '12.3', '12.34']) assert.equal(AMOUNT_PATTERN.test(valid), true);
  for (const invalid of ['12,34', '-1', '1.234', 'abc']) assert.equal(AMOUNT_PATTERN.test(invalid), false);
});

test('valida datas de calendário e exclui datas futuras', () => {
  assert.equal(isFutureDate('2026-10-21', today), false);
  assert.equal(isFutureDate('2026-10-22', today), true);
  assert.equal(isFutureDate('2026-02-30', today), true);
});

test('recentes inclui os últimos sete dias e nunca inclui despesas futuras', () => {
  const expenses = [
    { id: 'recent', date: '2026-10-15' },
    { id: 'today', date: '2026-10-21' },
    { id: 'old', date: '2026-10-14' },
    { id: 'future', date: '2026-10-22' },
  ];
  assert.deepEqual(getRecentExpenses(expenses, today).map(({ id }) => id), ['recent', 'today']);
});

test('reducer mantém operações imutáveis e a identidade da despesa editada', () => {
  const original = [{ id: 'one', description: 'Almoço', amount: 20 }];
  const updated = expensesReducer(original, {
    type: 'UPDATE',
    expense: { id: 'one', description: 'Jantar', amount: 30 },
  });

  assert.notEqual(updated, original);
  assert.deepEqual(original[0], { id: 'one', description: 'Almoço', amount: 20 });
  assert.deepEqual(updated[0], { id: 'one', description: 'Jantar', amount: 30 });
  assert.deepEqual(expensesReducer(updated, { type: 'DELETE', id: 'one' }), []);
  assert.deepEqual(expensesReducer([], { type: 'ADD', expense: original[0] }), original);
  assert.deepEqual(expensesReducer(original, { type: 'SET', expenses: [] }), []);
});

test('calcula total somente a partir dos valores fornecidos', () => {
  assert.equal(calculateTotal([{ amount: 12.5 }, { amount: 2 }, { amount: 'invalid' }]), 14.5);
});
