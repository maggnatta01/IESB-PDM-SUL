const { CATEGORIES } = require('../constants/categories');

const AMOUNT_PATTERN = /^\d*\.?\d{0,2}$/;

function toLocalDate(value) {
  if (typeof value !== 'string' || !value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (match) {
    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    if (
      date.getFullYear() !== Number(match[1])
      || date.getMonth() !== Number(match[2]) - 1
      || date.getDate() !== Number(match[3])
    ) return null;
    return date;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isFutureDate(value, today = new Date()) {
  const date = toLocalDate(value);
  if (!date) return true;
  const candidateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return candidateDay > todayDay;
}

function validate(values, today = new Date()) {
  const description = String(values.description ?? '').trim();
  const amount = String(values.amount ?? '');
  const parsedAmount = Number.parseFloat(amount);
  const date = String(values.date ?? '');

  return {
    description: description.length >= 3 ? '' : 'A descrição deve ter pelo menos três caracteres.',
    amount: Number.isFinite(parsedAmount) && parsedAmount > 0 && AMOUNT_PATTERN.test(amount)
      ? ''
      : 'Informe um valor maior que zero, com até duas casas decimais.',
    date: date && !isFutureDate(date, today) ? '' : 'Informe uma data válida que não seja futura.',
    category: CATEGORIES.includes(values.category) ? '' : 'Selecione uma categoria.',
  };
}

function getRecentExpenses(expenses, now = new Date()) {
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const firstDay = new Date(todayStart);
  firstDay.setDate(firstDay.getDate() - 6);
  const endOfToday = new Date(todayStart);
  endOfToday.setDate(endOfToday.getDate() + 1);

  return expenses.filter((expense) => {
    const date = toLocalDate(expense.date);
    return date && date >= firstDay && date < endOfToday;
  });
}

function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => {
    const amount = Number(expense.amount);
    return total + (Number.isFinite(amount) ? amount : 0);
  }, 0);
}

module.exports = {
  AMOUNT_PATTERN,
  calculateTotal,
  getRecentExpenses,
  isFutureDate,
  toLocalDate,
  validate,
};
