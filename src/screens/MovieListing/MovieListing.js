//react components
import React, { useEffect, useState } from 'react';
import {
	StyleSheet, Text,
	View, SectionList,
	 TouchableOpacity
} from 'react-native';
//custom components
import Header from '../../components/Header/Header';
//styles
import {styles} from "./MovieListingStyle";
//service 
import * as service from "./MovieListingService";

const MovieListing = ({ navigation }) => {

	//states
	const [movieListing, setMovieListing] = useState([]);

	//function : service function
	const getFormattedMovieLiting = async () => {
		try {
			const res = await service.getFormattedMovieLiting();
			setMovieListing(res.data);
		} catch (error) {
			setMovieListing([]);
			console.log("error in getFormattedMovieLiting",error);
		}
	}
	//function : render function
	const movieListRenderItem = ({ item }) => (
		<TouchableOpacity onPress={() => navigation.navigate("AllMovie", { typeOf: item.typeOf, industory: item.industory,flag:1 })} 
		key={item.title} style={styles.item}>
			<View>
				<Text style={styles.title}>{item.industory}</Text>
			</View>
		</TouchableOpacity>
	);
	//useEffect
	useEffect(() => {
		getFormattedMovieLiting()
		return () => {
		}
	}, []);
	//UI
	return (
		<View style={{ flex: 1, backgroundColor: "#000" }}>
			<Header/>
			<SectionList
				sections={movieListing}
				keyExtractor={(item, index) => item + index}
				renderItem={movieListRenderItem}
				renderSectionHeader={({ section: { title } }) => (
					<View style={styles.titleView}>
						<Text style={styles.header}>{title}</Text>
					</View>
				)}
			/>
		</View>
	)
}

export default MovieListing;
