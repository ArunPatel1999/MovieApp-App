import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { Alert, Linking, Platform } from 'react-native'
import { ScreenNames } from './src/global'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { BASE_URL } from './src/global/server'

class NotificationManager extends React.Component {
	configure = () => {
		PushNotification.configure({
			onRegister: function (token) {
			},
			

			onNotification: function (notification) {
				// process the notification
				// if (Platform.OS == "android") {
				// 	if (notification.data.status == "ORDER") {
				// 		Linking.openURL(`https://thekkeindia.com/orderDetails/${notification.data.commonId}/true`);
				// 	} else {
				// 		if (notification.data.deeplinkType == "OFFER") {
				// 			Linking.openURL(`https://thekkeindia.com/offer/false`);
				// 		} else {
				// 			if (notification.data.combo == true && notification.data.productId > 0) {
				// 				Linking.openURL(`https://thekkeindia.com/comboProduct/${notification.data.productId}/true`);
				// 			} else if (notification.data.combo == true) {
				// 				Linking.openURL(`https://thekkeindia.com/comboProducts/true`);
				// 			} else if (notification.data.productId != 0) {
				// 				Linking.openURL(`https://thekkeindia.com/product/${notification.data.productId}/true`);
				// 			} else if (notification.data.brandId != 0) {
				// 				Linking.openURL(`https://thekkeindia.com/subcategorywithbrand/${notification.data.categoryName}/${notification.data.categoryId}/${notification.data.brandId}/${notification.data.brand}/true`);
				// 			} else {
				// 				Linking.openURL(`https://thekkeindia.com/subcategory/${notification.data.categoryName}/${notification.data.categoryId}/${notification.data.brandId}/${notification.data.brand}/true`);
				// 			}
				// 		}
				// 	}
				// } else {
				// if (notification.data.status == "ORDER") {
				// 	Linking.openURL(`https://thekkeindia.com/orderDetails/${notification.data.commonId}/true`);
				// } else {
				// 	if (notification.data.deeplinkType == "OFFER") {
				// 		Linking.openURL(`thekkeindia.com://offer/false`);
				// 	} else {
				// 		if (notification.data.combo == true && notification.data.productId > 0) {
				// 			Linking.openURL(`thekkeindia.com://comboProduct/${notification.data.productId}/true`);
				// 		} else if (notification.data.combo == true) {
				// 			Linking.openURL(`thekkeindia.com://comboProducts/true`);
				// 		} else if (notification.data.productId != 0) {
				// 			Linking.openURL(`thekkeindia.com://product/${notification.data.productId}/true`);
				// 		} else if (notification.data.brandId != 0) {
				// 			Linking.openURL(`thekkeindia.com://subcategorywithbrand/${notification.data.categoryName}/${notification.data.categoryId}/${notification.data.brandId}/${notification.data.brand}/true`);
				// 		} else {
				// 			Linking.openURL(`thekkeindia.com://subcategory/${notification.data.categoryName}/${notification.data.categoryId}/${notification.data.brandId}/${notification.data.brand}/true`);
				// 		}
				// 	}
				// }
				// }
				// (required) Called when a remote is received or opened, or local notification is opened
				notification.finish(PushNotificationIOS.FetchResult.NoData);
			},
			popInitialNotification: false,
			permissions: {
				alert: true,
				badge: true,
				sound: true,
			},
		})
	}

	_buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
		return {
			id: id,
			autoCancel: true,
			largeIcon: options.largeIcon || "ic_launcher",
			smallIcon: options.smallIcon || "ic_launcher",
			bigText: message || '',
			subText: title || '',
			vibrate: options.vibrate || false,
			vibration: options.vibration || 300,
			priority: options.priority || "high",
			importance: options.importance || "high",
			data: data
		}
	}

	_buildIOSNotification = (id, title, message, data = {}, options = {}) => {
		return {
			alertAction: options.alertAction || "view",
			category: options.category || "",
			userInfo: {
				id: id,
				item: data
			}
		}
	}

	showNotification = (id, title, message, data = {}, options = {}) => {
		PushNotification.localNotification({
			/* Android Only Properties */
			...this._buildAndroidNotification(id, title, message, data, options),

			/* IOS Only Properties */
			...this._buildIOSNotification(id, title, message, data, options),

			/* Android and IOS Properties */
			title: title || "",
			message: message || "",
			playSound: options.playSound || false,
			soundName: options.soundName || 'default',
			userInteraction: false
		})
	}

	cancelAllLocalNotification = () => {
		if (Platform.OS === 'ios') {
			PushNotification.removeAllDeliveredNotifications()
		} else {
			PushNotification.cancelAllLocalNotifications()
		}
	}

	unregister = () => {
		PushNotification.unregister()
	}
}
export const notificationManager = new NotificationManager()