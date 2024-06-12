//import : react components
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
//custom components
import Header from '../../components/Header/Header';
import {WIDTH} from '../../global/constants';
//npm
import RNFetchBlob from 'rn-fetch-blob';
//styles
import {styles} from './TVSeriesDetailStyle';
//service
import * as service from './TVSeriesService';
//svg
import Play from '../../assets/svg/play-button.svg';
import PlaySvg from '../../assets/svg/play.svg';
import FilledFavSvg from '../../assets/svg/Fav.svg';
import UnfilledFavSvg from '../../assets/svg/heart.svg';
import DownloadSvg from '../../assets/svg/mdDownload.svg';
import ClockSvg from '../../assets/svg/clock 1.svg';
import moment from 'moment';
import {connect} from 'react-redux';
import HomePageLoader from 'components/CustomLoader/HomePageLoader';
import MyText from 'components/MyText/MyText';
import DetailPageLoader from 'components/CustomLoader/DetailPageLoader';
import MyButton from 'components/MyButton/MyButton';
import {Colors, Constants, MyIcon, ScreenNames, Server} from 'global/index';
import EpisodesModal from 'modals/EpisodesModal/EpisodesModal';

const TVSeriesDetail = ({route, navigation, userInfo, accessId}) => {
  //route variable
  const SeriesId = route.params.id;
  //hook : states
  const [seriesDetail, setSeriesDetail] = useState([]);
  const [checkFav, setCheckFav] = useState();
  const [epData, setEpData] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [totalSeasons, setTotalSeasons] = useState([]);
  //hook : modal states
  const [episodesLoader, setEpisodesLoader] = useState(false);
  const [showEpisodeModal, setShowEpisodeModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const ICON_SIZE = 24;
  //function : navigation function
  const gotoImageView = link =>
    navigation.navigate(ScreenNames.IMAGE_VIEW_SCREEN, {url: link});
  //function : imp function
  const loadData = async () => {
    setShowLoader(true);
    await getAllEpisodes(selectedSeason);
    await getSeriesDetailById();
    setShowLoader(false);
  };
  //function : service function
  const getSeriesDetailById = async () => {
    try {
      const paramsData = {
        userId: accessId,
      };
      const endPoint = `${Server.movie_detail}${SeriesId}`;
      const {response, status} = await Server.getAPI(endPoint, paramsData);
      if (status) {
        setSeriesDetail(response);
        console.log(response.totalSeasons);
        const newArr = [];
        for (let i = 1; i <= response.totalSeasons; i++) {
          newArr.push(i);
        }
        setTotalSeasons(newArr);
      }
    } catch (error) {
      console.log('error in getSeriesDetailById', error);
    }
  };
  const getAllEpisodes = async seasonNumber => {
    setEpisodesLoader(true);
    try {
      const paramsData = {
        userId: accessId,
      };
      const endPoint = `${Server.movie_detail}${SeriesId}/season/${seasonNumber}`;
      const {response, status} = await Server.getAPI(endPoint, paramsData);
      if (status) {
        setEpData(response);
      }
    } catch (error) {
      console.log('error in getAllEpisodes', error);
    }
    setEpisodesLoader(false);
  };
  const checkFavourite = async () => {
    try {
      const resp = await service.checkFavourite(userInfo.token, SeriesId);
      setCheckFav(resp.data);
    } catch (error) {
      console.log('error in checkFavourite', error);
    }
  };
  const sendMovieInFavList = async () => {
    try {
      const resp = await service.sendMovieInFavList(userInfo.token, SeriesId);
      if (resp.data) {
        setCheckFav(true);
      }
    } catch (error) {
      console.log('error in sendMovieInFavList', error);
    }
  };
  const removeMovieFromFavList = async () => {
    try {
      const resp = await service.removeMovieFromFavList(
        userInfo.token,
        SeriesId,
      );
      if (resp.data) {
        setCheckFav(false);
      }
    } catch (error) {
      console.log('error in removeMovieFromFavList', error);
    }
  };
  //function : render function
  const seriesPartRender = ({item, index}) => {
    if (episodesLoader) {
      return <ActivityIndicator animating={true} size={'large'} />;
    } else {
      return (
        <View
          key={item.partId}
          style={{
            marginVertical: 50,
            marginHorizontal: 10,
            borderColor: '#FFF',
            borderWidth: 0.5,
            padding: 10,
            flexDirection: 'row',
            borderRadius: 20,
          }}>
          <View style={{width: '30%'}}>
            <Image
              source={{uri: item.image}}
              style={{
                width: 100,
                height: 100,
                borderColor: '#FFF',
                borderWidth: 0.2,
                borderRadius: 100,
                marginTop: -50,
                marginLeft: 5,
              }}
            />
            <Text
              style={{
                fontSize: 14,
                color: '#FFF',
                textAlign: 'center',
                marginLeft: 5,
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
          </View>
          <View style={{width: '70%', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                color: '#FFF',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Part : {item.number}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#FFF',
                fontWeight: 'bold',
              }}>
              {item.description}
            </Text>
            <View style={{marginTop: 20, flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => MoviePlayer(item.partLink)}
                style={{marginRight: 20}}>
                <Play />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => downloadMovie(index + 1, item.partLink)}>
                <DownloadSvg />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  };

  //function : imp function
  const MoviePlayer = (link, audioTrack) =>
    navigation.navigate('MoviePlayer', {link: link, audioTrack: audioTrack});

  const downloadMovie = async (partNumber, downloadLink) => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      let DownloadDir =
        Platform.OS == 'ios'
          ? RNFetchBlob.fs.dirs.DocumentDir
          : RNFetchBlob.fs.dirs.DownloadDir;
      const {dirs} = RNFetchBlob.fs;
      const dirToSave =
        Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
      const configfb = {
        fileCache: true,
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: 'Moviepur',
        path: `${dirToSave}/${seriesDetail.name} episode${partNumber}.mkv`,
      };
      const configOptions = Platform.select({
        ios: {
          fileCache: configfb.fileCache,
          title: configfb.title,
          path: configfb.path,
          appendExt: 'mkv',
        },
        android: configfb,
      });
      Platform.OS == 'android'
        ? RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              path: `${DownloadDir}/${seriesDetail.name}${partNumber}.mkv`,
              description: 'Moviepur',
              title: `${seriesDetail.name} episode${partNumber}.mkv`,
              mime: 'application/mkv',
              mediaScannable: true,
            },
          })
            .fetch('GET', `${downloadLink}`)
            .catch(error => {
              console.warn(error.message);
            })
        : RNFetchBlob.config(configOptions)
            .fetch('GET', `${downloadLink}`, {})
            .then(res => {
              if (Platform.OS === 'ios') {
                RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
                RNFetchBlob.ios.previewDocument(configfb.path);
              }
              console.log('The file saved to ', res);
            })
            .catch(e => {
              console.log('The file saved to ERROR', e.message);
            });
    } else {
      Alert.alert('Permission denied');
    }
  };

  //useEffect
  useEffect(() => {
    loadData();
  }, [SeriesId]);

  //UI
  if (showLoader) {
    return (
      <View style={{backgroundColor: '#000', flex: 1}}>
        <Header />
        <DetailPageLoader />
      </View>
    );
  } else {
    return (
      <View style={{backgroundColor: '#000', flex: 1}}>
        <Header />
        <ScrollView>
          <View>
            <Image
              style={styles.imageStyle}
              source={{uri: seriesDetail.image}}
            />
            <View
              style={{
                padding: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  justifyContent: 'space-between',
                }}>
                <MyText
                  text={seriesDetail.name}
                  fontSize={20}
                  textAlign="center"
                  fontWeight="bold"
                />
                <View style={{flexDirection: 'row'}}>
                  <MyIcon.AntDesign
                    name="like2"
                    color={Colors.WHITE}
                    size={ICON_SIZE}
                    style={{marginRight: 20}}
                  />
                  <MyIcon.Feather
                    name="bookmark"
                    color={Colors.WHITE}
                    size={ICON_SIZE}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <MyIcon.AntDesign
                    name="star"
                    size={20}
                    color={Colors.SELECTIVE_YELLOW}
                  />
                  <MyText text={seriesDetail?.imdbRating} marginLeft={5} />
                  <MyText text={'/10 IMDb'} />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <MyIcon.AntDesign
                    name="star"
                    size={20}
                    color={Colors.SELECTIVE_YELLOW}
                  />
                  <MyText text={seriesDetail?.moviepur} marginLeft={5} />
                  <MyText text={'/10 Moviepur'} />
                </View>
              </View>
              <FlatList
                horizontal
                style={{marginVertical: 10}}
                data={seriesDetail.genres}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        padding: 5,
                        paddingHorizontal: 15,
                        backgroundColor: Colors.DARK_JUNGLE_GREEN,
                        marginRight: 10,
                        borderRadius: 100,
                      }}>
                      <MyText text={item} />
                    </TouchableOpacity>
                  );
                }}
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{alignItems: 'center'}}>
                  <MyIcon.Ionicons
                    name="timer-outline"
                    size={ICON_SIZE}
                    color={Colors.WHITE}
                  />
                  <MyText text={seriesDetail.runTime} fontWeight="800" />
                </View>
                <View style={{alignItems: 'center'}}>
                  <MyIcon.Octicons
                    name="number"
                    size={ICON_SIZE}
                    color={Colors.WHITE}
                  />
                  <MyText
                    text={`Total Seasons ${seriesDetail.totalSeasons}`}
                    fontWeight="800"
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <MyButton
                  icon={
                    <MyIcon.AntDesign
                      name="playcircleo"
                      color={Colors.WHITE}
                      size={24}
                    />
                  }
                  title="Watch Now"
                  width={'48%'}
                  onPress={() => setShowEpisodeModal(true)}
                />
                <MyButton
                  icon={
                    <MyIcon.AntDesign
                      name="download"
                      color={Colors.WHITE}
                      size={24}
                    />
                  }
                  backgroundColor={Colors.DANGER}
                  title="Download"
                  width={'48%'}
                />
              </View>
              <View style={{marginVertical: 10}}>
                <MyText text={'STORYLINE'} fontSize={16} fontWeight="bold" />
                <MyText text={seriesDetail.description} lineHeight={23} />
              </View>
              <View style={{marginVertical: 10}}>
                <MyText text={'PREMIERE'} fontSize={16} fontWeight="bold" />
                <MyText text={seriesDetail.year} lineHeight={23} />
              </View>
              <MyText
                text={'STARS'}
                fontSize={16}
                fontWeight="bold"
                marginTop={5}
              />
              <FlatList
                horizontal
                style={{marginVertical: 10}}
                data={seriesDetail.stars}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 15,
                        marginRight: 10,
                        // borderRadius: 100,
                      }}>
                      <Image
                        resizeMode="center"
                        source={{
                          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/800px-Tom_Holland_by_Gage_Skidmore.jpg',
                        }}
                        style={{height: 100, width: 100, borderRadius: 100}}
                      />
                      <MyText text={item} />
                    </TouchableOpacity>
                  );
                }}
              />
              <MyText
                text={'DIRECTORS'}
                fontSize={16}
                fontWeight="bold"
                marginTop={5}
              />
              <FlatList
                horizontal
                style={{marginVertical: 10}}
                data={seriesDetail.directors}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 15,
                        marginRight: 10,
                        // borderRadius: 100,
                      }}>
                      <Image
                        resizeMode="center"
                        source={{
                          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/800px-Tom_Holland_by_Gage_Skidmore.jpg',
                        }}
                        style={{height: 100, width: 100, borderRadius: 100}}
                      />
                      <MyText text={item} />
                    </TouchableOpacity>
                  );
                }}
              />
              {seriesDetail?.writers?.length > 0 ? (
                <View style={{marginVertical: 10}}>
                  <MyText text={'WRITERS'} fontSize={16} fontWeight="bold" />
                  <MyText text={seriesDetail.writers} lineHeight={23} />
                </View>
              ) : null}
              <MyText
                text={'SCREENSHOTS'}
                fontSize={16}
                fontWeight="bold"
                marginTop={5}
              />
              <FlatList
                horizontal
                style={{marginVertical: 10}}
                data={seriesDetail.otherImages}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => gotoImageView(item)}
                      style={{
                        marginRight: 10,
                      }}>
                      <Image
                        source={{
                          uri: item,
                        }}
                        style={{
                          height: 150,
                          width: Constants.WIDTH / 1.5,
                          borderRadius: 10,
                        }}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </ScrollView>
        {/* {seriesDetail ? (
          <FlatList
            nestedScrollEnabled
            ListHeaderComponent={() => {
              return (
                <HeaderPart
                  seriesDetail={seriesDetail}
                  navigation={navigation}
                />
              );
            }}
            data={epData}
            renderItem={seriesPartRender}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={styles.ActivityIndicatorView}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )} */}
        <EpisodesModal
          TotalSeasons={totalSeasons}
          SeriesId={SeriesId}
          visible={showEpisodeModal}
          setVisibility={setShowEpisodeModal}
        />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  userInfo: state.user.userInfo,
  accessId: state.user.accessId,
});
export default connect(mapStateToProps, null)(TVSeriesDetail);

/* <View>

<View
  style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  }}>
  
  {checkFav ? (
    <TouchableOpacity
      onPress={() => removeMovieFromFavList()}>
      <FilledFavSvg />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={() => sendMovieInFavList()}>
      <UnfilledFavSvg />
    </TouchableOpacity>
  )}
</View>





<View style={{marginLeft: 10}}>
 
  
</View>
<FlatList
  data={totalSeasons}
  horizontal
  renderItem={({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          getAllEpisodes(item);
          setSelectedSeason(item);
        }}
        style={{
          margin: 10,
          padding: 10,
          backgroundColor:
            selectedSeason == item
              ? Colors.THEME_GREEN
              : Colors.WHITE,
        }}>
        <MyText
          text={`Season ${item}`}
          textColor={
            selectedSeason == item
              ? Colors.WHITE
              : Colors.BLACK
          }
        />
      </TouchableOpacity>
    );
  }}
/>
<Text
  style={{
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  }}>
  Parts {seriesDetail?.seriesDownloadLinks?.length}
</Text>
</View> */
