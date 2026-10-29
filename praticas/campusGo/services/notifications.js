import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function scheduleReminder(title, seconds) {
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('campusgo-reminders', {
        name: 'Lembretes do CampusGo',
        importance: Notifications.AndroidImportance.DEFAULT,
        vibrationPattern: [0, 250, 250, 250],
      });
    }

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') return false;

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: 'Este é o seu lembrete do CampusGo.',
        ...(Platform.OS === 'android' ? { channelId: 'campusgo-reminders' } : {}),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: Math.max(1, seconds),
      },
    });

    return true;
  } catch (error) {
    console.error('Não foi possível agendar o lembrete local.', error);
    return false;
  }
}
