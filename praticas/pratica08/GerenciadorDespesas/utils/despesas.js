const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Outros'];
const FORMATO_VALOR = /^\d+(?:[.,]\d{1,2})?$/;

function converterValor(valor) {
  const texto = String(valor).trim();
  if (!FORMATO_VALOR.test(texto)) return null;

  const numero = Number(texto.replace(',', '.'));
  return Number.isFinite(numero) && numero > 0 ? numero : null;
}

function validarDespesa({ titulo, valor, categoria }) {
  return {
    titulo: titulo.trim() ? '' : 'Informe a descrição da despesa.',
    valor: converterValor(valor) !== null
      ? ''
      : 'Informe um valor positivo com até duas casas decimais.',
    categoria: CATEGORIAS.includes(categoria) ? '' : 'Selecione uma categoria.',
  };
}

function calcularTotal(despesas) {
  return despesas.reduce((soma, despesa) => {
    const valor = Number(String(despesa.valor).replace(',', '.'));
    return soma + (Number.isFinite(valor) ? valor : 0);
  }, 0);
}

function filtrarDespesas(despesas, categoria) {
  return categoria === 'Todas'
    ? despesas
    : despesas.filter((despesa) => despesa.categoria === categoria);
}

module.exports = {
  CATEGORIAS,
  calcularTotal,
  converterValor,
  filtrarDespesas,
  validarDespesa,
};