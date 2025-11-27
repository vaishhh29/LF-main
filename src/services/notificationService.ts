import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

export const setupNotifications = async (onReceive: (notif: any) => void) => {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) console.log('✅ Notifications permission granted');

  messaging().onMessage(async (remoteMessage) => {
    console.log('📩 Foreground message:', remoteMessage);
    await notifee.displayNotification({
      title: remoteMessage.notification?.title ?? 'New Message',
      body: remoteMessage.notification?.body ?? '',
      android: { channelId: 'default', smallIcon: 'ic_launcher' },
    });
    onReceive(remoteMessage);
  });
};
