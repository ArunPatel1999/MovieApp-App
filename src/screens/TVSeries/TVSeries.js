
//react components
import React ,{useEffect,useState} from 'react';
import { 
	StyleSheet, Text,
	 View,FlatList,
	 ActivityIndicator	
} from 'react-native';
//cunstom components
import Header from '../../components/Header/Header';
import SeriesCard from "../../components/SeriesCard/SeriesCard";
//service 
import * as service from "./TVSeriesService";

const TVSeries = () => {

	//states
	const[mostLikedSeries,setMostLikedSeries]=useState([]);
	const[latestReleaseSeries,setLatestReleaseSeries]=useState([]);
	//function : service function
	const getMostLikedTVSeries=async()=>{
		try {
			const resp=await service.getMostLikedTVSeries();
			setMostLikedSeries(resp.data);
		} catch (error) {
			setMostLikedSeries([])
			console.log("error in getMostLikedTVSeries",error);
		}
	}
	const getLatestReleaseSeries=async()=>{
		try {
			const resp=await service.getLatestReleaseSeries();
			setLatestReleaseSeries(resp.data);
		} catch (error) {
			console.log("error in getLatestReleaseSeries",error);
		}
	}

	//function : render function
	const mostLikedSeriesRender=({item})=>(
		<SeriesCard 
			key={item.id}
			imageUrl={item.image_url}
			item={item}
		/>
	)
	//useEffect
	useEffect(()=>{
		getMostLikedTVSeries()
		getLatestReleaseSeries()
	},[])

	//UI
	return (
		<View style={{ flex: 1, backgroundColor: "#000" }}>
			<Header
				ShowSearchButton={true} />
			<View>
				<Text style={styles.TextStyle}>
					Most Liked Series
				</Text>
				{
					mostLikedSeries.length>0
					?
					<FlatList
					horizontal={true}
					data={mostLikedSeries}
					renderItem={mostLikedSeriesRender}
					keyExtractor={item=>item.id}
				/>
					:
					<View style={styles.ActivityIndicatorView}>
							<ActivityIndicator size="small" color="#00ff00" />
						</View>

				}
			
			</View>
			<View>
				<Text style={styles.TextStyle}>
					Latest Release Series
				</Text>
				{
					latestReleaseSeries.length>0
					?
					<FlatList
						horizontal={true}
						data={latestReleaseSeries}
						renderItem={mostLikedSeriesRender}
						keyExtractor={item=>item.id}
					/>
					:
					<View style={styles.ActivityIndicatorView}>
							<ActivityIndicator size="small" color="#00ff00" />
						</View>
				}
				
			</View>
		</View>
	)
}

export default TVSeries

const styles = StyleSheet.create({
	
	TextStyle: {
		fontSize: 14,
		marginLeft:20,
		marginVertical:20,
		fontWeight: "bold",
		color: "#FFF"
	}
})
