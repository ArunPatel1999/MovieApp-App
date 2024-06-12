import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack/HomeStack';
import SeriesStack from './SeriesStack/SeriesStack';
import ProfileStack from './ProfileStack/ProfileStack';
import {Platform, View} from 'react-native';

//my imports

// SVG
import MovieSvg from '../../assets/svg/video 1.svg';
import SeriesSvg from '../../assets/svg/screenplay 1.svg';
import UserSvg from '../../assets/svg/user 1.svg';
import SearchSvg from '../../assets/svg/search.svg';
import Clock from '../../assets/svg/clock 1.svg';
import Heart from '../../assets/svg/heart.svg';
import {Colors} from 'global/index';

// import MenuSvg from '../../assets/svg/menu/menu_icon';
// import MenuFilledSvg from '../../assets/svg/menu/menu_icon_filled';
// import HomeSvg from '../../assets/svg/menu/home_icon';
// import HomeFilledSvg from '../../assets/svg/menu/home_icon_filled';
// import NotificationsSvg from '../../assets/svg/menu/notification_icon';
// import NotificationsFilledSvg from '../../assets/svg/menu/notification_icon_filled';
// import ProfileSvg from '../../assets/svg/menu/profile_icon';
// import ProfileFilledSvg from '../../assets/svg/menu/profile_icon_filled';

// import HomeStack from '../HomeStack/HomeStack';
// import BrandStack from '../BrandStack/BrandStack';
// import ProfileStack from '../ProfileStack/ProfileStack';
// import NotificationStack from '../NotificationStack/NotificationStack';
// import { Colors } from '../../global';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      backBehavior="none"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
          backgroundColor: Colors.ONXY,
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View>
                <MovieSvg />
                <View
                  style={{
                    height: 5,
                    width: 20,
                    position: 'absolute',
                    left: 2,
                    bottom: -10,
                    borderRadius: 3,
                    backgroundColor: '#FFF',
                  }}
                />
              </View>
            ) : (
              <MovieSvg />
            ),
        }}
      />
      <Tab.Screen
        name="Series"
        component={SeriesStack}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View>
                <SeriesSvg />
                <View
                  style={{
                    height: 5,
                    width: 20,
                    position: 'absolute',
                    bottom: -10,
                    borderRadius: 3,
                    backgroundColor: '#FFF',
                    left: 5,
                  }}
                />
              </View>
            ) : (
              <SeriesSvg />
            ),
        }}
      />
      {/* <Tab.Screen name="Notifications" component={NotificationStack}
				options={{
					tabBarIcon: ({ focused }) => (
						focused ?
							< View>
								<NotificationsFilledSvg />
								<View style={{ height: 5, width: 5, position: "absolute", bottom: -10, right: 6, borderRadius: 3, backgroundColor: Colors.PRIMARY }} />
							</View>
							: <NotificationsSvg />
					),
				}}
			/> */}
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View>
                <UserSvg />
                <View
                  style={{
                    height: 5,
                    width: 20,
                    position: 'absolute',
                    bottom: -10,
                    borderRadius: 3,
                    backgroundColor: '#FFF',
                    left: 3,
                  }}
                />
              </View>
            ) : (
              <UserSvg />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabs;
