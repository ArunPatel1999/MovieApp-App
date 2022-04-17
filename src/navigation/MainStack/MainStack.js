import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { CommonActions, NavigationContainer } from '@react-navigation/native';


//screens imports
import BottomTabs from "../BottomTab/BottomTab";
import Splash from '../../screens/SplashScreen/Splash';
import HomePage from '../../screens/HomePage/HomePage';
import MoviePlayer from '../../screens/MoviePlayer/MoviePlayer';

enableScreens();
const stack = createNativeStackNavigator();

const MainStack = ({ myUserId, dispatch, navigation, country }) => {
	return (
		<NavigationContainer
		// linking={Platform.OS === 'android' ? linking : linkingIOS}
		>
			<stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Splash'}>
				<stack.Screen name="Splash" component={Splash} />
				<stack.Screen name="HomePage" component={HomePage} />
				<stack.Screen name="Bottomtabs" component={BottomTabs} />
				<stack.Screen name={"MoviePlayer"}	component={MoviePlayer} />
				{/* <stack.Screen name={ScreenNames.OTP_PAGE} component={OTPScreen} /> */}
			</stack.Navigator>
		</NavigationContainer>
	);
};
export default MainStack;
