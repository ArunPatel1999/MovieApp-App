import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

//screens imports
import HomePage from '../../../screens/HomePage/HomePage';
import SearchMovie from "../../../screens/SearchMovie/SearchMovie";
import MovieDetail from "../../../screens/MovieDetail/MovieDetail";
import MovieListing from "../../../screens/MovieListing/MovieListing";
import AllMovie from '../../../screens/AllMovie/AllMovie';
import DownloadScreen from "../../../screens/DownloadScreen/DownloadScreen";
import MoviePlayer from '../../../screens/MoviePlayer/MoviePlayer';
import SpecialSection from '../../../screens/SpecialSection/SpecialSection';
import TVSeriesDetail from "../../../screens/TVSeriesDetail/TVSeriesDetail";
import { ScreenNames } from '../../../global';

enableScreens();
const stack = createNativeStackNavigator();
const HomeStack = () => {
	return (
		<stack.Navigator
			screenOptions={
				{
					headerShown: false
				}}
			initialRouteName={"HomePage"}
		>
			<stack.Screen
				name={"HomePage"}
				component={HomePage} />
			<stack.Screen
				name={"SearchMovie"}
				component={SearchMovie} />
			<stack.Screen
				name={"MovieDetail"}
				component={MovieDetail} />
			<stack.Screen
				name={"MovieListing"}
				component={MovieListing} />
			<stack.Screen
				name={"AllMovie"}
				component={AllMovie} />
			<stack.Screen
				name={"DownloadScreen"}
				component={DownloadScreen} />
			<stack.Screen
				name={"SpecialSection"}
				component={SpecialSection} />
			<stack.Screen
				name={ScreenNames.TVSERIES_DETAIL}
				component={TVSeriesDetail} />
		</stack.Navigator>
	);
};
export default HomeStack;