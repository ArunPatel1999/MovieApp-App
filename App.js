//react components
import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
//redux
import { Provider } from 'react-redux'
import { store } from './src/redux/store/store';
//screens
import MainStack from './src/navigation/MainStack/MainStack';
//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//firebase
import messaging from '@react-native-firebase/messaging';
//notification
import { NotificationManagerAndroid } from './NotificationManager';
import { notificationManager } from './NotificationManagerIOS';

const Stack = createStackNavigator();

function MyStack() {
	return (
		<Provider store={store}>
			<StatusBar
				backgroundColor="#000" />
			<MainStack />
		</Provider>
	);
}
export default function App() {

	async function requestUserPermission() {
		const authorizationStatus = await messaging().requestPermission({
			sound: false,
			announcement: true,
		});

	}

	React.useEffect(() => {
		try {
			requestUserPermission();
			const unsubscribe = messaging().onMessage(async remoteMessage => {
				JSON.stringify(remoteMessage.data);
				const { messageId } = remoteMessage;
				const data = remoteMessage.data
				console.warn("data", data);
				if (Platform.OS === 'android') {
					NotificationManagerAndroid.showNotification(data.Title, data.notificationText , data.subText, messageId, data);
				} else {
					notificationManager.showNotification(2, data.Title, data.notificationText , data, {})
				}
			});
			return unsubscribe;
		} catch (error) {
			console.log(error.message);
		}
	}, []);
	return (
		<MyStack />
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',

	},
});