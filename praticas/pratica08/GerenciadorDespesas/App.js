import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/IconButton';
import { DespesasContext } from './components/DespesasContext';
import DespesasRecentes from './screens/DespesasRecentes';
import TodasDespesas from './screens/TodasDespesas';
import GerenciarDespesa from './screens/GerenciarDespesa';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const despesasIniciais = [
  {
    id: '1',
    titulo: 'Compras no mercado',
    valor: 186.4,
    categoria: 'Alimentação',
    data: '2026-10-12T12:00:00.000Z',
  },
  {
    id: '2',
    titulo: 'Cartão de transporte',
    valor: 82.5,
    categoria: 'Transporte',
    data: '2026-10-11T12:00:00.000Z',
  },
  {
    id: '3',
    titulo: 'Ingresso de cinema',
    valor: 54,
    categoria: 'Lazer',
    data: '2026-10-10T12:00:00.000Z',
  },
];

function BottomTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarLabelStyle: { fontSize: 12 },
        headerRight: () => (
          <IconButton
            icon="add-circle-outline"
            size={28}
            color="#176b57"
            onPress={() => navigation.getParent()?.navigate('GerenciarDespesa')}
          />
        ),
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [despesas, setDespesas] = useState(despesasIniciais);
  const adicionarDespesa = (despesa) => {
    setDespesas((despesasAtuais) => [despesa, ...despesasAtuais]);
  };

  return (
    <DespesasContext.Provider value={{ despesas, adicionarDespesa }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Despesas"
            component={BottomTabScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GerenciarDespesa"
            component={GerenciarDespesa}
            options={{ title: 'Nova despesa' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DespesasContext.Provider>
  );
}