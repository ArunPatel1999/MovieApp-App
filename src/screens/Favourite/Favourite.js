//react components
import React, { useEffect, useState } from 'react';
import {
	 Text,
	View, FlatList,
	Dimensions,
} from 'react-native';
//custom components
import Header from '../../components/Header/Header';
import MovieCard from '../../components/MovieCard/MovieCard';
import SeriesCard from "../../components/SeriesCard/SeriesCard";
//styles
import {styles} from "./FavouriteStyle";
import { HEIGHT } from '../../global/constants';

//service 
import * as service from './FavouriteService';
//svg
//redux
import { connect } from 'react-redux';



const Favourite = ({ navigation,userInfo }) => {
	//states
	const [movieData, setmovieData] = useState([]);
	
	//function : service function
	const getFavMovieById = async () => {
		try {
			const resp=await service.getFavMovieById(userInfo?.token);
			setmovieData(resp.data.likesMovie);
		} catch (error) {
			setmovieData([]);
			console.log("error in getFavMovieById",error);
		}
	}

	//useEffect
	useEffect(() => {
		getFavMovieById();
		return () => {
		}
	}, [userInfo])
	const BollyMovieRenderFunction = ({ item }) => (
		<>
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
		
			</>
	);
	return (
		<View style={styles.fullView}>
			<Header />
			<View style={styles.container}>
				<Text style={styles.TextView}>Favourite</Text>
			</View>
			<View style={{ marginBottom: 120 }}>
				{
					movieData.length>0
					?
					<FlatList
					showsVerticalScrollIndicator={true}
					data={movieData}
					numColumns={2}
					renderItem={BollyMovieRenderFunction}
					keyExtractor={item => item.id}
					/>
					:
					<View style={{justifyContent:"center",alignItems:"center",height:HEIGHT/1.4}}>
					<Text style={{color:"#fff",textAlign:"center"}}>
						Add movie in your Favourites section
					</Text>
					</View>
				}
				
			</View>
			<View style={{ height: 100 }} />
		</View>
	)
}
const mapStateToProps = state => ({
	userInfo: state.user.userInfo,
});
export default connect(mapStateToProps,null) (Favourite);
