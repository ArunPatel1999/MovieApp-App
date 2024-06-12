//import : react components
import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
//import : custom components
import DetailPageLoader from 'components/CustomLoader/DetailPageLoader';
import Header from 'components/Header/Header';
//import : modal
import AskSource from 'modals/AskSource/AskSource';
import RNFetchBlob from 'rn-fetch-blob';
//styles
import {styles} from './MovieDetailStyle';
//svg
import Play from '../../assets/svg/play-button.svg';
import PlaySvg from '../../assets/svg/play.svg';
import FilledFavSvg from '../../assets/svg/Fav.svg';
import UnfilledFavSvg from '../../assets/svg/heart.svg';
import DownloadSvg from '../../assets/svg/mdDownload.svg';
import ClockSvg from '../../assets/svg/clock 1.svg';
//redux
import {connect} from 'react-redux';
import {WIDTH} from '../../global/constants';
import {Colors, Constants, ScreenNames, Server} from '../../global';
import MyText from 'components/MyText/MyText';
const windowWidth = Dimensions.get('window').width;

const MovieDetail = ({route, navigation, userInfo, accessId}) => {
  //variables : route variables
  const movieId = route.params.id;
  //hook : states
  const [movieDetail, setmovieDetail] = useState([]);
  const [checkFav, setCheckFav] = useState();
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  const [showAskSource, setShowAskSource] = useState(false);
  //function : service function
  const loadData = async () => {
    setShowLoader(true);
    await getMovieDetail();
    setShowLoader(false);
  };
  const getMovieDetail = async () => {
    try {
      const paramsData = {
        userId: accessId,
      };
      const endPoint = `${Server.movie_detail}${movieId}`;
      const {response, status} = await Server.getAPI(endPoint, paramsData);
      if (status) {
        setmovieDetail(response);
        setCheckFav(response.like);
      }
    } catch (error) {
      setmovieDetail([]);
      console.log('error in getMovieDetail', error);
    }
  };

  const likeMovie = async () => {
    try {
      const endPoint = `${Server.add_in_fav_or_watch}${accessId}/LIKE`;
      const {response, status} = await Server.patchAPI(endPoint, movieDetail);
      if (status) {
        setCheckFav(true);
      }
    } catch (error) {
      console.log('error in likeMovie', error);
    }
  };
  const removeLike = async () => {
    try {
      const endPoint = `${Server.remove_from_fav_or_watch}${accessId}/LIKE/${movieDetail.id}`;
      const {response, status} = await Server.deleteAPI(endPoint);
      if (status) {
        setCheckFav(false);
      }
    } catch (error) {
      console.log('error in removeLike', error);
    }
  };
  const downloadMovie = async () => {
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
      const exist = await RNFetchBlob.fs.exists(
        `${dirToSave}/Moviepur/${movieDetail.name}.mkv`,
      );
      const configfb = {
        fileCache: true,
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: 'Moviepur',
        path: `${dirToSave}/Moviepur/${movieDetail.name}.mkv`,
      };
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
        Platform.OS == 'android'
          ? RNFetchBlob.config({
              fileCache: true,
              addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: `${DownloadDir}/Moviepur/${movieDetail.name}.mkv`,
                description: 'Moviepur',
                title: `${movieDetail.name}.mkv`,
                mime: 'application/mkv',
                mediaScannable: true,
              },
            })
              .fetch('GET', `${movieDetail.movieDownloadLink}`)
              .catch(error => {
                console.warn(error.message);
              })
          : RNFetchBlob.config(configOptions)
              .fetch('GET', `${movieDetail.movieDownloadLink}`, {})
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
        Alert.alert('Oops', 'your movie already available in download folder');
      }
    } else {
      Alert.alert('Permission denied');
    }
  };
  const MoviePlayer = (link, audioTrack) =>
    navigation.navigate('MoviePlayer', {link: link, audioTrack: audioTrack});

  const BollyMovieRenderFunction = ({item}) => (
    <View key={item.id}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(ScreenNames.IMAGE_VIEW_SCREEN, {url: item})
        }
        style={{
          width: Constants.WIDTH / 2,
          height: 200,
          backgroundColor: '#FFF',
          margin: 5,
          borderWidth: 0.5,
          borderRadius: 10,
        }}>
        <Image
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
            borderRadius: 10,
          }}
          source={{uri: item}}
        />
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    loadData();
    return () => {};
  }, [movieId, userInfo?.token]);

  //UI
  if (showLoader) {
    return (
      <View style={styles.mainView}>
        <Header />
        <DetailPageLoader />
      </View>
    );
  } else {
    return (
      <View style={styles.mainView}>
        <Header />
        {movieDetail ? (
          <ScrollView>
            <Image
              style={styles.imageStyle}
              source={{uri: movieDetail.image}}
            />
            <Text style={{...styles.primaryTextStyle, marginTop: 10}}>
              {movieDetail.name}
            </Text>
            <Text style={{...styles.primaryTextStyle, marginBottom: 10}}>
              {movieDetail.year}
            </Text>
            <View style={styles.mainButtonView}>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  onPress={() => setShowAskSource(true)}
                  // onPress={() =>
                  //   MoviePlayer(
                  //     movieDetail.movieDownloadLink,
                  //     movieDetail.language,
                  //   )
                  // }
                >
                  <Play />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowAskSource(true)}
                  // onPress={() => downloadMovie()}
                >
                  <DownloadSvg />
                </TouchableOpacity>
                {checkFav ? (
                  <TouchableOpacity onPress={() => removeLike()}>
                    <FilledFavSvg />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => likeMovie()}>
                    <UnfilledFavSvg />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View>
              <View style={styles.ratingView}>
                <View style={styles.ratingRuntime}>
                  <ClockSvg />
                  <Text style={styles.ratingTitle}>{movieDetail.runTime}</Text>
                </View>
                <View style={styles.ratingTextView}>
                  <Text style={styles.ratingText}>
                    {movieDetail?.imdbRating}
                  </Text>
                  <Text style={styles.ratingText}>IMDb</Text>
                </View>
                <View style={styles.ratingTextView}>
                  <Text style={styles.ratingText}>
                    {movieDetail?.moviepurPoint}
                  </Text>
                  <Text style={styles.ratingText}>Moviepur</Text>
                </View>
              </View>
              <View style={{paddingHorizontal: 10, marginTop: 10}}>
                <Text numberOfLines={10} style={{color: '#FFF', fontSize: 12}}>
                  {movieDetail.description}
                </Text>
              </View>
              <View style={styles.secondaryTextViewStyle}>
                <Text style={styles.secondaryTextTitleStyle}>Director :</Text>
                <Text style={styles.secondaryTextStyle}>
                  {movieDetail.directors}
                </Text>
              </View>
              <View style={styles.secondaryTextViewStyle}>
                <Text style={styles.secondaryTextTitleStyle}>Writer :</Text>
                <Text style={styles.secondaryTextStyle}>
                  {movieDetail.writers}
                </Text>
              </View>
              <View style={styles.secondaryTextViewStyle}>
                <Text style={styles.secondaryTextTitleStyle}>Stars :</Text>
                <Text style={styles.secondaryTextStyle}>
                  {movieDetail.stars}
                </Text>
              </View>
              <View style={{marginLeft: 10}}>
                <MyText
                  text="ScreenShot"
                  fontSize={18}
                  textColor={Colors.THEME_GREEN}
                />

                <View>
                  <FlatList
                    data={movieDetail.otherImages}
                    horizontal={true}
                    renderItem={BollyMovieRenderFunction}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.ActivityIndicatorView}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
        <AskSource
          visible={showAskSource}
          setVisibility={setShowAskSource}
          movieName={movieDetail.name}
          movieId={movieId}
        />
      </View>
    );
  }
};
const mapStateToProps = state => ({
  accessId: state.user.accessId,
  userInfo: state.user.userInfo,
});
export default connect(mapStateToProps, null)(MovieDetail);
