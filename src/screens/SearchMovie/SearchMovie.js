//react components
import React, { useState, useEffect, useRef } from 'react';
import {
	Text,View,
	TextInput, FlatList,
	Dimensions
} from 'react-native';

//custom components
import Header from '../../components/Header/Header';
import MovieCard from '../../components/MovieCard/MovieCard';
import SeriesCard from "../../components/SeriesCard/SeriesCard";
//styles
import { styles } from "./SearchMovieStyle";
//svg
import SearchSvg from "../../assets/svg/search.svg"
//service 
import * as service from "./SearchMovieService";

const SearchMovie = ({  }) => {

	//states
	const [movieData, setMovieData] = useState([]);
	//ref
	const textInput = useRef();
	//function : service function
	const searchMovieByName = async (text) => {
		try {
			const res = await service.searchMovieByName(text);
			setMovieData(res.data);
		} catch (error) {
			setMovieData([]);
			console.log("error in searchMovieByName", error);
		}
	}
	//function : render function
	const SearchMoviesRenderFunction = ({ item }) => (
		<React.Fragment key={item.id}>
		{
			item.type=="Movie"
			?
			<MovieCard
				item={item}
				imageUrl={item.image_url}
			/>
			:
			<SeriesCard 
				imageUrl={item.image_url}
				item={item}
			/>
		}
		</React.Fragment>
	);
	//useEffect
	useEffect(() => {
		return () => {
		}
	}, [])

	//UI
	return (
		<View style={{ backgroundColor: "#000", flex: 1 }}>
			<Header/>
			<View style={styles.searchView}>
				<SearchSvg />
				<TextInput
					style={styles.input}
					onChangeText={text => searchMovieByName(text)}
					value={textInput}
					placeholder="Enter movie here"
					placeholderTextColor="#FFF"
				/>
			</View>
			<View style={{ marginBottom: 120 }}>
				{
					movieData.length > 0
						?
						<FlatList
							showsVerticalScrollIndicator={true}
							data={movieData}
							numColumns={2}
							renderItem={SearchMoviesRenderFunction}
							keyExtractor={item => item.id}
						/>
						:
						<Text style={styles.noMovieErrorText}>
							Please enter movie name
					</Text>
				}

			</View>

		</View>
	)
}

export default SearchMovie;
