//react components
import React,{useState,useEffect} from 'react';
import { 
    View ,Text,
    Image,ScrollView,
    TouchableOpacity,FlatList,
    ActivityIndicator,PermissionsAndroid
} from 'react-native';
//custom components
import Header from "../../components/Header/Header";
import { WIDTH } from '../../global/constants';
//npm
import RNFetchBlob from 'rn-fetch-blob';
//styles
import {styles} from "./TVSeriesDetailStyle";
//service 
import * as service from "./TVSeriesService";
//svg
import Play from "../../assets/svg/play-button.svg";
import PlaySvg from "../../assets/svg/play.svg";
import FilledFavSvg from "../../assets/svg/Fav.svg";
import UnfilledFavSvg from "../../assets/svg/heart.svg";
import DownloadSvg from "../../assets/svg/mdDownload.svg";
import ClockSvg from "../../assets/svg/clock 1.svg";
import moment from 'moment';
import { connect } from 'react-redux';

const TVSeriesDetail = ({route,navigation,userInfo}) => {

  //route variable
  const SeriesId=route.params.id;
  //states
  const[seriesDetail,setSeriesDetail]=useState([]);
  const [checkFav, setCheckFav] = useState();
  //function : service function
  const getSeriesDetailById= async()=>{
    try {
      const resp=await  service.getSeriesDetailById(SeriesId);
      setSeriesDetail(resp.data);
    } catch (error) {
      console.log("error in getSeriesDetailById",error);
    }
  }
  const checkFavourite = async () => {
		try {
			const resp = await service.checkFavourite(userInfo.token, SeriesId);
			setCheckFav(resp.data);
		} catch (error) {
			console.log("error in checkFavourite", error);
		}
	}
  const sendMovieInFavList = async () => {
		try {
			const resp = await service.sendMovieInFavList(userInfo.token, SeriesId);
			if (resp.data) {
				setCheckFav(true)
			}
		} catch (error) {
			console.log("error in sendMovieInFavList", error);
		}
	}
	const removeMovieFromFavList = async () => {
		try {
			const resp = await service.removeMovieFromFavList(userInfo.token, SeriesId);
			if (resp.data) {
				setCheckFav(false)
			}
		} catch (error) {
			console.log("error in removeMovieFromFavList", error);
		}
	}
  //function : render function 
  const seriesPartRender=({item,index})=>(
    <View key={item.partId} style={{marginVertical:50,
    marginHorizontal:10,borderColor:"#FFF",borderWidth:0.5,
    padding:10,flexDirection:"row",
    borderRadius:20}}>
      <View style={{width:"30%"}}>
        <Image
        source={{uri:item.partImage}}
        style={{width:100,height:100,borderColor:"#FFF",
        borderWidth:0.2,
          borderRadius:100,marginTop:-50,marginLeft:5}}
        />
        <Text style={{fontSize:14,color:"#FFF",textAlign:"center",marginLeft:5,
        fontWeight:"bold"}}>
          {item.partName}
        </Text>
      </View>
      <View style={{width:"50%",alignItems:"center"}}>
      <Text style={{fontSize:14,color:"#FFF",textAlign:"center",
        fontWeight:"bold"}}>
         Part : {index+1}
        </Text>
      <Text style={{fontSize:14,color:"#FFF",textAlign:"center",
        fontWeight:"bold"}}>
         Run Time : {item.partRunTime}
        </Text>
        <View style={{marginTop:20,flexDirection:"row",}}>
        <TouchableOpacity 
        onPress={()=>MoviePlayer(item.partLink)}
        style={{marginRight:20}}>
          <Play/>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>downloadMovie(index+1,item.partLink)}
        >
          <DownloadSvg/>
        </TouchableOpacity>
        </View>
        
        </View>
    </View>
  );

  //function : imp function
  const MoviePlayer=(link,audioTrack)=>(
    navigation.navigate("MoviePlayer",{link:link,audioTrack:audioTrack})
    )

    const downloadMovie = async (partNumber,downloadLink) => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let DownloadDir = Platform.OS == "ios" ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir;
        const { dirs } = RNFetchBlob.fs;
        const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir
        const configfb = {
          fileCache: true,
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title: "Moviepur",
          path: `${dirToSave}/${seriesDetail.name} episode${partNumber}.mkv`,
        }
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
                path: `${DownloadDir}/${seriesDetail.name}${partNumber}.mkv`,
                description: 'Moviepur',
                title: `${seriesDetail.name} episode${partNumber}.mkv`,
                mime: 'application/mkv',
                mediaScannable: true
              }
            })
            .fetch('GET', `${downloadLink}`)
            .catch((error) => {
              console.warn(error.message);
            })
          :
          RNFetchBlob.config(configOptions)
            .fetch('GET', `${downloadLink}`, {})
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
      } else {
        Alert.alert("Permission denied")
      }
    };

  //useEffect
  useEffect(()=>{
    checkFavourite()
    getSeriesDetailById()
  },[SeriesId])


  //UI
  return(
    <View style={{ backgroundColor: "#000",flex:1 }}>
    <Header/>
    {
      seriesDetail
      ?
    <ScrollView>
      <Image style={styles.imageStyle} 
      source={{ uri: seriesDetail.image_url }} />
      <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",
    paddingHorizontal:20,
    }}>
        <View></View>
        <View>
        <Text style={{ color: "#FFF", textAlign: "center", fontSize: 20,marginTop:10, fontWeight: "bold" }}>
        {seriesDetail.name}
        </Text>
        <Text style={{ color: "#FFF", textAlign: "center", fontSize: 20, marginBottom: 10, fontWeight: "bold" }}>
        ({moment(seriesDetail.releaseDate).format('YYYY')})
        </Text>
        </View>
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
      
      <View>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <ClockSvg /><Text style={{ color: "red", fontSize: 16, marginLeft: 5 }}>	{seriesDetail.runTime}</Text>
          </View>
          <View style={{ marginLeft: 10, alignItems: "center" }}>
            <Text style={{ color: "#FFF", fontSize: 12, marginLeft: 5 }}>{seriesDetail?.imdb}</Text>
            <Text style={{ color: "#FFF", fontSize: 12, marginLeft: 5 }}>IMDb</Text>
          </View>
          <View style={{ marginLeft: 10, alignItems: "center" }}>
            <Text style={{ color: "#FFF", fontSize: 12, marginLeft: 5 }}>{seriesDetail?.rottenTomatoes}%</Text>
            <Text style={{ color: "#FFF", fontSize: 12, marginLeft: 5 }}>Rotten Tomatoes</Text>
          </View>
          <View style={{ marginLeft: 10, alignItems: "center" }}>
            <Text style={{ color: "#FFF", fontSize: 12, marginLeft: 5 }}>{seriesDetail?.moviepur}</Text>
            <Text style={{ color: "#FFF", fontSize: 12, marginLeft: 5 }}>Moviepur</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
          <Text style={{ color: "#FFF", fontSize: 12, }}>
            {seriesDetail.description}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 10, marginTop: 10, flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "red", fontSize: 16, fontWeight: "bold" }}>
            Director :
          </Text>
          <Text style={{ color: "#FFF", fontSize: 12, marginLeft: 10 }}>
            {seriesDetail.directors}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 10, marginTop: 3, flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "red", fontSize: 16, fontWeight: "bold" }}>
            Writer :
          </Text>
          <Text style={{ color: "#FFF", fontSize: 12, marginLeft: 10 }}>
            {seriesDetail.writers}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 10, marginTop: 3, flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "red", fontSize: 16, fontWeight: "bold" }}>
            Stars :
          </Text>
          <Text style={{ color: "#FFF", fontSize: 12, marginLeft: 10 }}>
          {seriesDetail.stars}
          </Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: "red", fontSize: 18, fontWeight: "bold" }}>
            Parts {seriesDetail?.seriesDownloadLinks?.length}
          </Text>
          <View>
            <FlatList
              data={seriesDetail.seriesDownloadLinks}
              renderItem={seriesPartRender}
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
export default connect(mapStateToProps,null) (TVSeriesDetail);
