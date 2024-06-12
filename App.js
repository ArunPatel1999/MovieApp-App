//import : react components
import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
//import : third parties
import messaging from '@react-native-firebase/messaging';
//import : redux
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
//import : stack
import MainStack from './src/navigation/MainStack/MainStack';
//import : notification
import {NotificationManagerAndroid} from './NotificationManager';
import {notificationManager} from './NotificationManagerIOS';
import Drawer from 'navigation/Drawer/Drawer';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from 'global/index';

const App = () => {
  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission({
      sound: false,
      announcement: true,
    });
  }

  React.useEffect(() => {
    try {
      NotificationManagerAndroid.createChannel();
      NotificationManagerAndroid.configure();
      requestUserPermission();
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        JSON.stringify(remoteMessage.data);
        const {messageId} = remoteMessage;
        const data = remoteMessage.data;
        console.warn('data', data);
        if (Platform.OS === 'android') {
          NotificationManagerAndroid.showNotification(
            data.Title,
            data.notificationText,
            data.subText,
            messageId,
            data,
          );
        } else {
          notificationManager.showNotification(
            2,
            data.Title,
            data.notificationText,
            data,
            {},
          );
        }
      });
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        const {data, messageId} = remoteMessage;
        const {Title, notificationText, subText} = data;
        if (Platform.OS === 'android') {
          NotificationManagerAndroid.showNotification(
            Title,
            notificationText,
            subText,
            messageId,
          );
        } else {
          notificationManager.showNotification(
            messageId,
            Title,
            notificationText,
            data,
            {},
          );
        }
      });
      return unsubscribe;
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor={Colors.BLACK} />
        <Drawer />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
