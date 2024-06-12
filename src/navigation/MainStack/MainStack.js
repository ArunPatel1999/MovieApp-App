import React from 'react';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

//screens imports
import BottomTabs from '../BottomTab/BottomTab';
import Splash from '../../screens/SplashScreen/Splash';
import HomePage from '../../screens/HomePage/HomePage';
import MoviePlayer from '../../screens/MoviePlayer/MoviePlayer';
import ImageViewScreen from 'screens/ImageViewScreen/ImageViewScreen';
import {ScreenNames} from 'global/index';

enableScreens();
const stack = createNativeStackNavigator();

const MainStack = ({myUserId, dispatch, navigation, country}) => {
  return (
    <stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Splash'}>
      <stack.Screen name="Splash" component={Splash} />
      <stack.Screen name="HomePage" component={HomePage} />
      <stack.Screen name="Bottomtabs" component={BottomTabs} />
      <stack.Screen name={'MoviePlayer'} component={MoviePlayer} />
      <stack.Screen
        name={ScreenNames.IMAGE_VIEW_SCREEN}
        component={ImageViewScreen}
      />
    </stack.Navigator>
  );
};
export default MainStack;
