// index.js
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

// Background handler - receives messages when app is backgrounded/killed
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);

  // Display a local notification (Android/iOS)
  try {
    // create channel for Android
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: remoteMessage.notification?.title ?? 'Background Message',
      body: remoteMessage.notification?.body ?? JSON.stringify(remoteMessage.data),
      android: {
        channelId,
        smallIcon: 'ic_launcher',
      },
    });
  } catch (e) {
    console.log('Error showing background notification', e);
  }
});

AppRegistry.registerComponent(appName, () => App);
