import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e2e8f0',
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 72,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';

          switch (route.name) {
            case 'index':
              iconName = 'home';
              break;
            case 'tasks':
              iconName = 'checkmark-circle';
              break;
            case 'wallet':
              iconName = 'wallet';
              break;
            case 'profile':
              iconName = 'person';
              break;
            default:
              iconName = 'home';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tarefas' }} />
      <Tabs.Screen name="wallet" options={{ title: 'Bolso' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
