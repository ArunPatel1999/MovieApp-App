//import : react components
import React from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
//import : utils
import {ScreenNames} from 'global/index';
//import : stack
import MainStack from 'navigation/MainStack/MainStack';
import CustomDrawer from './CustomDrawer';

const Drawer = ({}) => {
  //variables
  const Drawer = createDrawerNavigator();
  const initialRouteName = ScreenNames.MAIN_STACK;
  const screenOptions = {
    headerShown: false,
    drawerStyle: styles.myDrawerStyle,
  };
  const options = {
    swipeEnabled: false,
  };
  //function : render function
  const renderCustomDrawer = ({navigation}) => (
    <CustomDrawer navigation={navigation} />
  );
  //UI
  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      drawerContent={renderCustomDrawer}
      initialRouteName={initialRouteName}>
      <Drawer.Screen
        options={options}
        name={ScreenNames.MAIN_STACK}
        component={MainStack}
      />
    </Drawer.Navigator>
  );
};

export default Drawer;
const styles = StyleSheet.create({
  myDrawerStyle: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});
