//react components
import React, { useEffect, useState } from 'react'
import {
	Text, View,
	FlatList, TouchableOpacity,
	ScrollView,ActivityIndicator,
} from 'react-native';
//custom components
import Carousel from '../../components/Carousel/Carousel';
import Header from '../../components/Header/Header';
import MovieCard from '../../components/MovieCard/MovieCard';

//styles
import { styles } from "./HomePageStyle";

//service 
import * as service from "./HomePageService";


const HomePage = ({ navigation }) => {

	//Data
	const DATAFORALLMOVIE = [
		{
			id: 1,
			name: "Hollywood"
		},
		{
			id: 2,
			name: "Bollywood"
		},
		{
			id: 3,
			name: "Tollywood"
		}
	]

	//states
	const [bannerData,setBannerData]=useState([]);
	const [latestHollywood, setLatestHollywood] = useState([]);
	const [latestBollywood, setLatestBollywood] = useState([]);
	const [latestTollywood, setLatestTollywood] = useState([]);
	const [mostLikedMovies, setMostLikedMovies] = useState([]);

	//function : service function
	const getBanner=async()=>{
		try {
			const resp=await service.getBanner();
			setBannerData(resp.data);
		} catch (error) {
			setBannerData([]);
			console.log("error in getBanner",error);
		}
	}
	const getLatestHollywoodMovie = async () => {
		try {
			const resp = await service.getLatestHollywoodMovie();
			setLatestHollywood(resp.data)
		} catch (error) {
			setLatestHollywood([])
			console.log("error in getLatestHollywoodMovie", error);
		}
	}
	const getLatestBollywoodMovie = async () => {
		try {
			const resp = await service.getLatestBollywoodMovie();
			setLatestBollywood(resp.data)
		} catch (error) {
			setLatestBollywood([])
			console.log("error in getLatestBollywoodMovie", error);
		}
	}
	const getLatestTollywoodMovie = async () => {
		try {
			const resp = await service.getLatestTollywoodMovie();
			setLatestTollywood(resp.data)
		} catch (error) {
			setLatestTollywood([])
			console.log("error in getLatestTollywoodMovie", error);
		}
	}
	const getMostLikedMovie = async () => {
		try {
			const resp = await service.getMostLikedMovie();
			setMostLikedMovies(resp.data);
		} catch (error) {
			setMostLikedMovies([])
			console.log("error in getMostLikedMovie", error);
		}
	}
	//function : render function
	const movieIndustryRenderFunct = ({ item }) => (
		<TouchableOpacity
			// onPress={() => navigation.navigate("MovieListing")}
			onPress={() => navigation.navigate("AllMovie", { typeOf: item.typeOf, industory: item.name, flag: 0 })}
			style={{
				height: 40, width: 120, borderRadius: 10,
				backgroundColor: "#3c465c", justifyContent: "center", alignItems: "center",
				margin: 10
			}}>
			<Text style={{ color: "#FFF", fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
		</TouchableOpacity>
	)
	const movieRenderFunction = ({ item }) => (
		<MovieCard
			item={item}
			imageUrl={item.image_url}
			key={item.id}
		/>
	)
	const goToSpecialSection = () => {
		navigation.navigate("SpecialSection")
	}
	//useEffect
	useEffect(() => {
		getBanner()
		getLatestHollywoodMovie()
		getLatestBollywoodMovie()
		getLatestTollywoodMovie()
		getMostLikedMovie()
	}, []);

	//UI
	return (
		<View style={styles.container}>
			<Header
				ShowSearchButton={true}
			/>
			<ScrollView >
				<View style={{ height: 10 }} />
				<Carousel data={bannerData} />
				<FlatList
					horizontal={true}
					data={DATAFORALLMOVIE}
					renderItem={movieIndustryRenderFunct}
					keyExtractor={item => item.id}
				/>
				<View style={styles.titleStyleView}>
					<Text style={styles.TextStyle}>
						Latest Hollywood Release
					</Text>
				</View>
				<View>
					{
						latestHollywood.length>0
						?
						<FlatList
							data={latestHollywood}
							horizontal={true}
							renderItem={movieRenderFunction}
							keyExtractor={item => item.id}
						/>
						:
						<View style={styles.ActivityIndicatorView}>
							<ActivityIndicator size="small" color="#00ff00" />
						</View>
					}
					
				</View>
				<View style={styles.titleStyleView}>
					<Text style={styles.TextStyle}>
						Latest Bollywood Release
					</Text>
				</View>
				<View>
					{
						latestBollywood.length>0
						?
						<FlatList
							data={latestBollywood}
							horizontal={true}
							renderItem={movieRenderFunction}
							keyExtractor={item => item.id}
						/>
						:
						<View style={styles.ActivityIndicatorView}>
							<ActivityIndicator size="small" color="#00ff00" />
						</View>
					}
				
				</View>
				<View style={styles.titleStyleView}>
					<Text style={styles.TextStyle}>
						Latest Tollywood Release
					</Text>
				</View>
				<View>
					{
						latestTollywood.length>0
						?
						<FlatList
							data={latestTollywood}
							horizontal={true}
							renderItem={movieRenderFunction}
							keyExtractor={item => item.id}
						/>
						:
						<View style={styles.ActivityIndicatorView}>
							<ActivityIndicator size="small" color="#00ff00" />
						</View>
					}
					
				</View>
				<View style={styles.titleStyleView}>
					<Text style={styles.TextStyle}>
						Most Liked Movies
					</Text>
				</View>
				<View>
					{
						mostLikedMovies.length>0
						?
						<FlatList
							data={mostLikedMovies}
							horizontal={true}
							renderItem={movieRenderFunction}
							keyExtractor={item => item.id}
						/>
						:
						<View style={styles.ActivityIndicatorView}>
							<ActivityIndicator size="small" color="#00ff00" />
						</View>
					}
				
				</View>
				<TouchableOpacity
					onPress={() => goToSpecialSection()}
					style={styles.specialSectionView}
				>
					<Text style={styles.specialSectionText}>Movies Special</Text>
				</TouchableOpacity>
				<View style={{ height: 20 }} />
			</ScrollView>

		</View>
	)
}

export default HomePage;


