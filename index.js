/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//firebase
import messaging from '@react-native-firebase/messaging';
//notification
import { NotificationManagerAndroid } from './NotificationManager';
import { notificationManager } from './NotificationManagerIOS';

NotificationManagerAndroid.createChannel();
NotificationManagerAndroid.configure();

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    const { data, messageId } = remoteMessage;
    const { Title, notificationText, subText } = data;
    if (Platform.OS === 'android') {
        NotificationManagerAndroid.showNotification(Title, notificationText, subText, messageId);
    } else {
        notificationManager.showNotification(messageId, Title, notificationText, data, {})
    }
});

AppRegistry.registerComponent(appName, () => App);
