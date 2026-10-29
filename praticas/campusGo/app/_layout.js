import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ExpensesContextProvider } from '../store/expenses-context';

export default function RootLayout() {
  return (
    <ExpensesContextProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#f8fafc',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="task/[id]" options={{ title: 'Tarefa' }} />
        <Stack.Screen name="new-task" options={{ title: 'Nova tarefa', presentation: 'modal' }} />
      </Stack>
    </ExpensesContextProvider>
  );
}
