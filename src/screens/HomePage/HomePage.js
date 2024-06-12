//import : react components
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
//import : custom components
import Carousel from 'components/Carousel/Carousel';
import Header from 'components/Header/Header';
import MovieCard from 'components/MovieCard/MovieCard';
//import : utils
import {Server} from 'global/index';
//import : styles
import {styles} from './HomePageStyle';
import HomePageLoader from 'components/CustomLoader/HomePageLoader';
import ViewAllTitle from 'components/ViewAllTitle/ViewAllTitle';

const HomePage = ({navigation}) => {
  //hook : states
  const [bannerData, setBannerData] = useState([]);
  const [recommandationsMovie, setRecommandationsMovie] = useState([]);
  const [mostLikes, setMostLikes] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  //function : service function
  const loadData = async () => {
    setShowLoader(true);
    await getBanner();
    await getAllRecommandations();
    await getAllMostLikes();
    await getAllMovies();
    setShowLoader(false);
  };
  const getBanner = async () => {
    try {
      const {response, status} = await Server.getAPI(Server.banner);
      if (status) {
        setBannerData(response);
      } else {
        setBannerData([]);
      }
    } catch (error) {
      console.log('error in getBanner', error);
    }
  };
  const getAllRecommandations = async () => {
    try {
      const paramsData = {
        pageNumber: 0,
        pageSize: 20,
        type: 'MOVIE',
      };
      const {response, status} = await Server.getAPI(
        Server.recommandation,
        paramsData,
      );
      if (status) {
        setRecommandationsMovie(response.data);
      }
    } catch (error) {
      console.error('error in getAllRecommandations', error);
    }
  };
  const getAllMostLikes = async () => {
    try {
      const paramsData = {
        pageNumber: 0,
        pageSize: 20,
        type: 'MOVIE',
      };
      const {response, status} = await Server.getAPI(
        Server.most_like,
        paramsData,
      );
      if (status) {
        setMostLikes(response.data);
      }
    } catch (error) {
      console.error('error in getAllRecommandations', error);
    }
  };
  const getAllMovies = async () => {
    try {
      const paramsData = {
        pageNumber: 0,
        pageSize: 20,
        type: 'MOVIE',
      };
      const {response, status} = await Server.getAPI(
        Server.find_all,
        paramsData,
      );
      if (status) {
        setAllMovies(response.data);
      }
    } catch (error) {
      console.error('error in getAllRecommandations', error);
    }
  };
  //function : render function

  const movieRenderFunction = ({item}) => {
    // console.log('item', item);
    return <MovieCard item={item} imageUrl={item.image} key={item.id} />;
  };
  const goToSpecialSection = () => {
    navigation.navigate('SpecialSection');
  };
  //hook : useEffect
  useEffect(() => {
    loadData();
  }, []);

  //UI
  if (showLoader) {
    return (
      <View style={styles.container}>
        <Header ShowSearchButton={true} />
        <HomePageLoader />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Header ShowSearchButton={true} />
        <ScrollView style={styles.mainView}>
          <View style={{height: 10}} />
          <Carousel data={bannerData} />
          <ViewAllTitle />
          <View style={styles.titleStyleView}>
            <Text style={styles.TextStyle}>Recommandation</Text>
          </View>
          <View>
            {recommandationsMovie.length > 0 ? (
              <FlatList
                data={recommandationsMovie}
                horizontal={true}
                renderItem={movieRenderFunction}
                keyExtractor={item => item.id}
              />
            ) : (
              <View style={styles.ActivityIndicatorView}>
                <ActivityIndicator size="small" color="#00ff00" />
              </View>
            )}
          </View>
          <View style={styles.titleStyleView}>
            <Text style={styles.TextStyle}>Most likes</Text>
          </View>
          <View>
            {mostLikes.length > 0 ? (
              <FlatList
                data={mostLikes}
                horizontal={true}
                renderItem={movieRenderFunction}
                keyExtractor={item => item.id}
              />
            ) : (
              <View style={styles.ActivityIndicatorView}>
                <ActivityIndicator size="small" color="#00ff00" />
              </View>
            )}
          </View>
          <View style={styles.titleStyleView}>
            <Text style={styles.TextStyle}>All Movie</Text>
          </View>
          <View>
            {allMovies.length > 0 ? (
              <FlatList
                data={allMovies}
                horizontal={true}
                renderItem={movieRenderFunction}
                keyExtractor={item => item.id}
              />
            ) : (
              <View style={styles.ActivityIndicatorView}>
                <ActivityIndicator size="small" color="#00ff00" />
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={() => goToSpecialSection()}
            style={styles.specialSectionView}>
            <Text style={styles.specialSectionText}>Movies Special</Text>
          </TouchableOpacity>
          <View style={{height: 20}} />
        </ScrollView>
      </View>
    );
  }
};

export default HomePage;
