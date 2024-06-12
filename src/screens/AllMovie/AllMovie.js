//import : react components
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

//custom components
import MovieCard from '../../components/MovieCard/MovieCard';
import Header from '../../components/Header/Header';

//styles
import {styles} from './AllMovieStyle';

//service
import * as service from './AllMovieService';
import SeriesCard from '../../components/SeriesCard/SeriesCard';

const AllMovie = ({navigation, route}) => {
  //route states
  const flag = route?.params?.flag;
  const typeOf = route.params.typeOf;
  const industory = route.params.industory;

  //states
  const [movieData, setmovieData] = useState([]);

  //function : service function
  const getMovieByIndustryName = async () => {
    try {
      const resp = await service.getMovieByIndustryName(industory);
      setmovieData(resp.data);
    } catch (error) {
      setmovieData([]);
      console.log('error in getMovieByIndustryName', error);
    }
  };
  const getMoviebyMovieType = async () => {
    try {
      const resp = await service.getMoviebyMovieType(typeOf, industory);
      setmovieData(resp.data);
    } catch (error) {
      setmovieData([]);
      console.log('error in getMoviebyMovieType', error);
    }
  };
  const getMoviePartById = async () => {
    try {
      const resp = await service.getMoviePartById(route.params.id);
      setmovieData(resp?.data?.movies);
    } catch (error) {
      setmovieData([]);
      console.log('error in getMoviePartById', error);
    }
  };
  const getlatestAddedMovie = async () => {
    try {
      const resp = await service.getlatestAddedMovie();
      setmovieData(resp.data);
    } catch (error) {
      setmovieData([]);
      console.log('error  in getlatestAddedMovie', error);
    }
  };
  //function : renderFunction
  const BollyMovieRenderFunction = ({item}) => (
    <React.Fragment key={item.id}>
      {item.type == 'Movie' ? (
        <MovieCard item={item} imageUrl={item.image_url} />
      ) : (
        <SeriesCard imageUrl={item.image_url} item={item} />
      )}
    </React.Fragment>
  );
  //useEffect

  useEffect(() => {
    if (route?.params?.flag == 0) {
      getMovieByIndustryName();
    } else if (route?.params?.flag == 1) {
      getMoviebyMovieType();
    } else if (route?.params?.flag == 4) {
      getlatestAddedMovie();
    } else {
      getMoviePartById();
    }
    return () => {};
  }, []);
  return (
    <View style={styles.fullView}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.TextView}>
          {industory ? industory : route.params.movieName}
        </Text>
        <Text style={styles.TextView}>{typeOf}</Text>
      </View>
      <View style={{marginBottom: 120}}>
        {movieData.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={true}
            data={movieData}
            numColumns={2}
            renderItem={BollyMovieRenderFunction}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.ActivityIndicatorView}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
      </View>
      <View style={{height: 100}} />
    </View>
  );
};

export default AllMovie;
