import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {styles} from './AskSourceStyle';
import MyText from 'components/MyText/MyText';
import {Colors, Constants, MyIcon, Server} from 'global/index';
import {useNavigation} from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';

const AskSource = ({visible, setVisibility, movieName, movieId}) => {
  //variables
  const navigation = useNavigation();
  //hook : states
  const [linksData, setLinksData] = useState([]);
  //hook : modal States
  const [showLoader, setShowLoader] = useState(false);
  //function : modal function
  const closeModal = () => {
    setLinksData([]);
    setVisibility(false);
  };
  //function : navigation
  const MoviePlayer = link => navigation.navigate('MoviePlayer', {link: link});
  const downloadMovie = async link => {
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
        `${dirToSave}/Moviepur/${movieName}.mkv`,
      );
      const configfb = {
        fileCache: true,
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: 'Moviepur',
        path: `${dirToSave}/Moviepur/${movieName}.mkv`,
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
                path: `${DownloadDir}/Moviepur/${movieName}.mkv`,
                description: 'Moviepur',
                title: `${movieName}.mkv`,
                mime: 'application/mkv',
                mediaScannable: true,
              },
            })
              .fetch('GET', `${link}`)
              .catch(error => {
                console.warn(error.message);
              })
          : RNFetchBlob.config(configOptions)
              .fetch('GET', `${link}`, {})
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
  //function : service function
  const fetchLinksFromFilePursuit = async () => {
    setShowLoader(true);
    try {
      const paramsData = {
        name: movieName,
      };
      const {response, status} = await Server.getAPI(
        Server.file_pursuit_link,
        paramsData,
      );
      if (status) {
        setLinksData(response.data);
      }
    } catch (error) {
      console.error('error in fetchLinksFromFilePursuit', error);
    }
    setShowLoader(false);
  };
  const fetchLinkFromFMovie = async () => {
    try {
      const endPoint = `${Server.f_movie_link}${movieId}/type/MOVIE`;
      const {response, status} = await Server.getAPI(endPoint);
      if (status) {
        downloadMovie(response);
        console.log(response);
      }
    } catch (error) {
      console.log('error in fetchLinkFromFMovie', error);
    }
  };
  //UI
  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      animationType="slide"
      transparent>
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} onPress={closeModal} />
        <View style={styles.mainView}>
          <MyText text="Select Source" />
          <View style={{height: 20}} />
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={fetchLinksFromFilePursuit}
              style={{
                backgroundColor: Colors.DARK_JUNGLE_GREEN,
                alignSelf: 'flex-start',
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginBottom: 20,
              }}>
              <MyIcon.MaterialIcons
                name="source"
                size={40}
                color={Colors.WHITE}
              />
              <MyText text={'Source 1'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={fetchLinkFromFMovie}
              style={{
                backgroundColor: Colors.DARK_JUNGLE_GREEN,
                alignSelf: 'flex-start',
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginBottom: 20,
              }}>
              <MyIcon.MaterialIcons
                name="source"
                size={40}
                color={Colors.WHITE}
              />
              <MyText text={'Source 2'} />
            </TouchableOpacity>
          </View>

          {showLoader ? (
            <ActivityIndicator size="large" color={Colors.THEME_GREEN} />
          ) : (
            <>
              {linksData.length > 0 ? (
                <FlatList
                  style={{height: Constants.HEIGHT / 2}}
                  data={linksData}
                  renderItem={({item, index}) => {
                    console.log(item);
                    return (
                      <TouchableOpacity
                        onPress={() => MoviePlayer(item.link)}
                        style={{
                          borderWidth: 1,
                          borderColor: Colors.SELECTIVE_YELLOW,
                          marginVertical: 10,
                          padding: 10,
                          borderRadius: 10,
                        }}>
                        <MyText text={item.name} />
                        <MyText text={`Size : ${item.size}`} />
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : null}
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AskSource;
