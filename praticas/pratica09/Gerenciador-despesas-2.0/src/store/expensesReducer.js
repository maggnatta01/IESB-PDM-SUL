function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.expense, ...state];
    case 'UPDATE':
      return state.map((expense) => (
        expense.id === action.expense.id
          ? { ...action.expense, id: expense.id }
          : expense
      ));
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.id);
    case 'SET':
      return action.expenses;
    default:
      throw new Error(`Ação de despesas desconhecida: ${action.type}`);
  }
}

module.exports = expensesReducer;
