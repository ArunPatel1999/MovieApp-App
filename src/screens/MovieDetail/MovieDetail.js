import React, { useState, useEffect } from 'react'
import {
	Image,
	Text, View,
	Dimensions, FlatList,
	TouchableOpacity,
	ScrollView, Platform,
	PermissionsAndroid,
	ActivityIndicator,
	Alert
} from 'react-native'
import Header from '../../components/Header/Header';
import RNFetchBlob from 'rn-fetch-blob';
//styles
import { styles } from './MovieDetailStyle';
//service
import * as service from "./MovieDetailService";
//svg
import Play from "../../assets/svg/play-button.svg";
import PlaySvg from "../../assets/svg/play.svg";
import FilledFavSvg from "../../assets/svg/Fav.svg";
import UnfilledFavSvg from "../../assets/svg/heart.svg";
import DownloadSvg from "../../assets/svg/mdDownload.svg";
import ClockSvg from "../../assets/svg/clock 1.svg";
//redux
import { connect } from 'react-redux';
import moment from 'moment';
import { WIDTH } from '../../global/constants';
const windowWidth = Dimensions.get('window').width;

const MovieDetail = ({ route, navigation, userInfo }) => {
	//route state
	const movieId = route.params.id;

	//states
	const [movieDetail, setmovieDetail] = useState([]);
	const [checkFav, setCheckFav] = useState();
	//function : service function
	const getMovieDetail = async () => {
		try {
			const res = await service.getMovieDetail(movieId);
			setmovieDetail(res.data);
		} catch (error) {
			setmovieDetail([])
			console.log("error in getMovieDetail", error);
		}
	}
	const checkFavourite = async () => {
		try {
			const resp = await service.checkFavourite(userInfo.token, movieId);
			setCheckFav(resp.data);
		} catch (error) {
			console.log("error in checkFavourite", error);
		}
	}
	const sendMovieInFavList = async () => {
		try {
			const resp = await service.sendMovieInFavList(userInfo.token, movieId);
			if (resp.data) {
				setCheckFav(true)
			}
		} catch (error) {
			console.log("error in sendMovieInFavList", error);
		}
	}
	const removeMovieFromFavList = async () => {
		try {
			const resp = await service.removeMovieFromFavList(userInfo.token, movieId);
			if (resp.data) {
				setCheckFav(false)
			}
		} catch (error) {
			console.log("error in removeMovieFromFavList", error);
		}
	}
	const downloadMovie = async () => {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
		);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			let DownloadDir = Platform.OS == "ios" ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir;
			const { dirs } = RNFetchBlob.fs;
			const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir
			const exist = await RNFetchBlob.fs.exists(`${dirToSave}/moviepur/${movieDetail.name}.mkv`)
			const configfb = {
				fileCache: true,
				useDownloadManager: true,
				notification: true,
				mediaScannable: true,
				title: "Moviepur",
				path: `${dirToSave}/moviepur/${movieDetail.name}.mkv`,
			}
			if (!exist) {
				const configOptions = Platform.select({
					ios: {
						fileCache: configfb.fileCache,
						title: configfb.title,
						path: configfb.path,
						appendExt: 'mkv',
					},
					android: configfb,
				});
				Platform.OS == "android"
					?
					RNFetchBlob
						.config({
							fileCache: true,
							addAndroidDownloads: {
								useDownloadManager: true,
								notification: true,
								path: `${DownloadDir}/moviepur/${movieDetail.name}.mkv`,
								description: 'Moviepur',
								title: `${movieDetail.name}.mkv`,
								mime: 'application/mkv',
								mediaScannable: true
							}
						})
						.fetch('GET', `${movieDetail.movieDownloadLink}`)
						.catch((error) => {
							console.warn(error.message);
						})
					:
					RNFetchBlob.config(configOptions)
						.fetch('GET', `${movieDetail.movieDownloadLink}`, {})
						.then((res) => {
							if (Platform.OS === "ios") {
								RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
								RNFetchBlob.ios.previewDocument(configfb.path);
							}
							console.log('The file saved to ', res);
						})
						.catch((e) => {
							console.log('The file saved to ERROR', e.message)
						});
			}
			else {
				Alert.alert("Oops", "your movie already available in download folder")
			}
		} else {
			Alert.alert("Permission denied")
		}
	};
	const MoviePlayer = (link, audioTrack) => (
		navigation.navigate("MoviePlayer", { link: link, audioTrack: audioTrack })
	)


	const BollyMovieRenderFunction = ({ item }) => (
		<View key={item.id}>
			<TouchableOpacity style={{
				width: windowWidth / 3.4, height: 150,
				backgroundColor: "#FFF", margin: 5,
				borderWidth: 0.5,
				borderRadius: 10,
			}}>
				<Image style={{ height: "100%", width: "100%", resizeMode: "cover", borderRadius: 10, }} source={{ uri: item }} />
			</TouchableOpacity>
		</View>
	);

	useEffect(() => {
		checkFavourite()
		getMovieDetail()
		return () => {
		}
	}, [movieId, userInfo?.token])
	return (
		<View style={styles.mainView}>
			<Header
			/>
			{
				movieDetail
					?
					<ScrollView>
						<Image 
							style={styles.imageStyle} 
							source={{ uri: movieDetail.image_url }} 
						/>
						<Text style={{...styles.primaryTextStyle,marginTop:10,}}>
							{movieDetail.name}
						</Text>
						<Text style={{...styles.primaryTextStyle,marginBottom:10}}>
							({moment(movieDetail.releaseDate).format('YYYY')})
						</Text>
						<View style={styles.mainButtonView}>
							<View style={styles.buttonView}>
								<TouchableOpacity
									onPress={() => MoviePlayer(movieDetail.movieDownloadLink, movieDetail.language)}>
									<Play />
								</TouchableOpacity>
								<TouchableOpacity onPress={() => downloadMovie()}>
									<DownloadSvg />
								</TouchableOpacity>
								{
									checkFav
										?
										<TouchableOpacity onPress={() => removeMovieFromFavList()}>
											<FilledFavSvg />
										</TouchableOpacity>
										:
										<TouchableOpacity onPress={() => sendMovieInFavList()}>
											<UnfilledFavSvg />
										</TouchableOpacity>
								}
							</View>
						</View>
						<View>

							<View style={styles.ratingView}>
								<View style={styles.ratingRuntime}>
									<ClockSvg />
									<Text style={styles.ratingTitle}>
										{movieDetail.runTime}
									</Text>
								</View>
								<View style={styles.ratingTextView}>
									<Text style={styles.ratingText}>
										{movieDetail?.imdb}
									</Text>
									<Text style={styles.ratingText }>IMDb</Text>
								</View>
								<View style={styles.ratingTextView}>
									<Text style={styles.ratingText}>
										{movieDetail?.rottenTomatoes}%
									</Text>
									<Text style={styles.ratingText}>Rotten Tomatoes</Text>
								</View>
								<View style={styles.ratingTextView}>
									<Text style={styles.ratingText}>
										{movieDetail?.moviepur}
									</Text>
									<Text style={styles.ratingText}>Moviepur</Text>
								</View>
							</View>
							<View style={{ paddingHorizontal: 10, marginTop: 10 }}>
								<Text numberOfLines={10} style={{ color: "#FFF", fontSize: 12, }}>
									{movieDetail.description}
								</Text>
							</View>
							<View style={styles.secondaryTextViewStyle}>
								<Text style={styles.secondaryTextTitleStyle}>
									Director :
								</Text>
								<Text style={styles.secondaryTextStyle}>
									{movieDetail.directors}
								</Text>
							</View>
							<View style={styles.secondaryTextViewStyle}>
								<Text style={styles.secondaryTextTitleStyle}>
									Writer :
								</Text>
								<Text style={styles.secondaryTextStyle}>
									{movieDetail.writers}
								</Text>
							</View>
							<View style={styles.secondaryTextViewStyle}>
								<Text style={styles.secondaryTextTitleStyle}>
									Stars :
								</Text>
								<Text style={styles.secondaryTextStyle}>
									{movieDetail.stars}
								</Text>
							</View>
							<View style={{ marginLeft: 10 }}>
								<Text style={{ color: "red", fontSize: 18, fontWeight: "bold" }}>
									ScreenShot
								</Text>
								<View>
									<FlatList
										data={movieDetail.otherImages}
										horizontal={true}
										renderItem={BollyMovieRenderFunction}
										keyExtractor={item => item.id}
									/>
								</View>
							</View>

						</View>
					</ScrollView>
					:
					<View style={styles.ActivityIndicatorView}>
						<ActivityIndicator size="large" color="#00ff00" />
					</View>
			}
		</View >
	)
}
const mapStateToProps = state => ({
	userInfo: state.user.userInfo,
});
export default connect(mapStateToProps, null)(MovieDetail);

