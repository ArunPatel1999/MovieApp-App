import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

//screens imports
import HomePage from '../../../screens/HomePage/HomePage';
import SearchMovie from "../../../screens/SearchMovie/SearchMovie";
import MovieDetail from "../../../screens/MovieDetail/MovieDetail";
import MovieListing from "../../../screens/MovieListing/MovieListing";
import Profile from '../../../screens/Profile/Profile';
import Favourite from '../../../screens/Favourite/Favourite';
import { ScreenNames } from '../../../global';
import MovieRequest from '../../../screens/MovieRequest/MovieRequest';
import MovieFeedback from '../../../screens/MovieFeedback/MovieFeedback';
import MovieReport from '../../../screens/MovieReport/MovieReport';
import TVSeriesDetail from "../../../screens/TVSeriesDetail/TVSeriesDetail";

enableScreens();
const stack = createNativeStackNavigator();
const ProfileStack = () => {
	return (
		<stack.Navigator
			screenOptions={
				{
					headerShown: false
				}}
			initialRouteName={"Profile"}
		>
			<stack.Screen
				name={"Profile"}
				component={Profile} />
			<stack.Screen
				name={ScreenNames.FAVOURITE}
				component={Favourite} />
			<stack.Screen
				name={ScreenNames.MOVIEREQUEST}
				component={MovieRequest} />
			<stack.Screen
				name={ScreenNames.MOVIEFEEDBACK}
				component={MovieFeedback} />
			<stack.Screen
				name={ScreenNames.MOVIEREPORT}
				component={MovieReport} />
			<stack.Screen
				name={"SearchMovie"}
				component={SearchMovie} />
			<stack.Screen
				name={ScreenNames.TVSERIES_DETAIL}
				component={TVSeriesDetail} />
			<stack.Screen
				name={"MovieDetail"}
				component={MovieDetail} />
		</stack.Navigator>
	);
};
export default ProfileStack;