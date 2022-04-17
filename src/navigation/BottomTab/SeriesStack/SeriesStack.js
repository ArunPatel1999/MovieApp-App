//react components
import React from 'react';
//npm
import { enableScreens } from 'react-native-screens';
//navigator
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
//screenNames
import { ScreenNames } from '../../../global';
//screens imports
import TVSeries from '../../../screens/TVSeries/TVSeries';
import TVSeriesDetail from '../../../screens/TVSeriesDetail/TVSeriesDetail';
import SearchMovie from "../../../screens/SearchMovie/SearchMovie";
import MovieDetail from "../../../screens/MovieDetail/MovieDetail";


enableScreens();

const stack = createNativeStackNavigator();
const SeriesStack = () => {
	return (
		<stack.Navigator
			screenOptions={
				{
					headerShown: false
				}}
			initialRouteName={ScreenNames.TVSERIES}
		>
			<stack.Screen
				name={ScreenNames.TVSERIES}
				component={TVSeries} />
			<stack.Screen
				name={"SearchMovie"}
				component={SearchMovie} />
			<stack.Screen
				name={"MovieDetail"}
				component={MovieDetail} />
			<stack.Screen
				name={ScreenNames.TVSERIES_DETAIL}
				component={TVSeriesDetail} />
		</stack.Navigator>
	);
};
export default SeriesStack;