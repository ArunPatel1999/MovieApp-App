import React from 'react';
import {
	StyleSheet, Text,
	View, FlatList,
	TouchableOpacity, Image,
	Dimensions,
} from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import Header from '../../components/Header/Header';
//svg
import CloseSvg from "../../assets/svg/close.svg";
import PauseSvg from "../../assets/svg/pause-button 1.svg";
import PlaySvg from "../../assets/svg/play.svg";
import DeleteSvg from "../../assets/svg/delete.svg";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const DownloadScreen = () => {
	const DATAFORHOLLYWOOD = [
		{
			id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
			uri: "https://cdn.seat42f.com/wp-content/uploads/2020/07/15192015/Project-Power-Movie-Poster-Jamie-Foxx.jpg",
			title: 'First Item',
		},
		{
			id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
			uri: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1574144362",
			title: 'Second Item',
		},
		{
			id: '58694a0f-3da1-471f-bd96-145571e29d72',
			uri: "https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217",
			title: 'Third Item',
		},
		{
			id: '58694a0f-3da1-471f-bd96-1455765429d72',
			uri: "https://rukminim1.flixcart.com/image/416/416/jeek8sw0/poster/a/d/g/small-hollywood-movie-poster-rocky-blue-ray-cover-hollywood-original-imaf32wkjhjf3gk4.jpeg?q=70",
			title: 'Fourth Item',
		},

	];
	const BollyMovieRenderFunction = ({ item }) => (
		<View key={item.id} style={{
			height: 100,
			backgroundColor: "#383838",
			margin: 10,
			padding: 5,
			borderRadius: 10,
			flexDirection: "row"
		}}>
			{/* image */}
			<Image style={{ height: "100%", width: "20%", resizeMode: "stretch", borderRadius: 10, }} source={{ uri: item.uri }} />
			<View style={{ marginLeft: 10, width: "75%" }}>
				<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
					<Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>{item.title}</Text>
					<CloseSvg />
				</View>
				<View >
					<Text style={{ fontSize: 16, color: "#FFF" }}>Your Download  50%</Text>
					<ProgressBar
						styleAttr="Horizontal"
						indeterminate={false}
						progress={0.5}
						color="#2196F3"
					/>
				</View>
				<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
					<Text style={{ fontSize: 12, color: "#FFF" }}>100 mb / 200 mb</Text>
					{/* <Text style={{ fontSize: 12, color: "#FFF" }}>pause</Text> */}
					<PauseSvg />
					{/* <PlaySvg />
					<DeleteSvg /> */}
				</View>
			</View>

		</View >
	);
	return (
		<View style={{ flex: 1, backgroundColor: "#000" }}>
			<Header />
			<View>
				<FlatList
					data={DATAFORHOLLYWOOD}
					renderItem={BollyMovieRenderFunction}
					keyExtractor={item => item.id}
				/>
			</View>
		</View>
	)
}

export default DownloadScreen

const styles = StyleSheet.create({})
