const assert = require('node:assert/strict');
const test = require('node:test');
const {
  calcularTotal,
  converterValor,
  filtrarDespesas,
  validarDespesa,
} = require('../utils/despesas');

test('converte vírgula decimal e rejeita valores fora do formato', () => {
  assert.equal(converterValor('12,50'), 12.5);
  assert.equal(converterValor('12.50'), 12.5);
  assert.equal(converterValor('0'), null);
  assert.equal(converterValor('-1'), null);
  assert.equal(converterValor('1,234'), null);
  assert.equal(converterValor('abc'), null);
});

test('valida descrição, valor positivo e categoria permitida', () => {
  assert.deepEqual(validarDespesa({
    titulo: '   ',
    valor: '0',
    categoria: '',
  }), {
    titulo: 'Informe a descrição da despesa.',
    valor: 'Informe um valor positivo com até duas casas decimais.',
    categoria: 'Selecione uma categoria.',
  });
  assert.deepEqual(validarDespesa({
    titulo: 'Almoço',
    valor: '34,90',
    categoria: 'Alimentação',
  }), { titulo: '', valor: '', categoria: '' });
});

test('soma valores e filtra sem modificar a lista original', () => {
  const despesas = [
    { id: '1', valor: 12.5, categoria: 'Alimentação' },
    { id: '2', valor: 8, categoria: 'Transporte' },
    { id: '3', valor: 1.25, categoria: 'Alimentação' },
  ];
  const filtradas = filtrarDespesas(despesas, 'Alimentação');

  assert.equal(calcularTotal(despesas), 21.75);
  assert.equal(calcularTotal([{ valor: '1,25' }, { valor: 2 }]), 3.25);
  assert.equal(calcularTotal(filtradas), 13.75);
  assert.deepEqual(filtradas.map(({ id }) => id), ['1', '3']);
  assert.equal(filtrarDespesas(despesas, 'Todas'), despesas);
  assert.equal(despesas.length, 3);
});