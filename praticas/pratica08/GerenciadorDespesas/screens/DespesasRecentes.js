import { useContext } from 'react';
import ListaDespesas from '../components/ListaDespesas';
import { DespesasContext } from '../components/DespesasContext';

export default function DespesasRecentes() {
  const { despesas } = useContext(DespesasContext);
  return <ListaDespesas despesas={despesas} />;
}