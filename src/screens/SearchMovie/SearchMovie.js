//import : react components
import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from 'react-native';
//import : custom components
import Header from 'components/Header/Header';
import SearchPageLoader from 'components/CustomLoader/SearchPageLoader';
import MovieCard from '../../components/MovieCard/MovieCard';
import SeriesCard from '../../components/SeriesCard/SeriesCard';
//import : styles
import {styles} from './SearchMovieStyle';
//import : utils
//svg
import {Colors, MyIcon, Server} from '../../global';
//service

const SearchMovie = ({}) => {
  //variables : ref
  const textInputRef = useRef();
  //hook : states
  const [searchedText, setSearchedText] = useState('');
  const [movieData, setMovieData] = useState([]);
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  //function : service function
  const searchMovieByName = async () => {
    setShowLoader(true);
    try {
      const paramsData = {
        pageNumber: 0,
        pageSize: 20,
      };
      const endPoint = `${Server.search}${searchedText}`;
      const {response, status} = await Server.getAPI(endPoint, paramsData);
      if (status) {
        setMovieData(response.data);
      }
      console.log(response, status);
    } catch (error) {
      console.log('error in searchMovieByName', error);
    }
    setShowLoader(false);
  };
  //function : render function
  const SearchMoviesRenderFunction = ({item}) => (
    <React.Fragment key={item.id}>
      {item.type == 'MOVIE' ? (
        <MovieCard item={item} imageUrl={item.image} />
      ) : (
        <SeriesCard imageUrl={item.image} item={item} />
      )}
    </React.Fragment>
  );
  //hook : useEffect
  useEffect(() => {
    return () => {};
  }, []);

  //UI
  return (
    <View style={{backgroundColor: '#000', flex: 1}}>
      <Header />
      <View style={styles.searchView}>
        <TextInput
          ref={textInputRef}
          style={styles.input}
          onChangeText={text => setSearchedText(text)}
          value={searchedText}
          placeholder="Enter movie here"
          placeholderTextColor="#FFF"
        />
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            searchMovieByName();
          }}
          style={{
            backgroundColor: Colors.SEA_GREEN,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '15%',
            borderRadius: 10,
          }}>
          <MyIcon.AntDesign name="search1" color={Colors.WHITE} size={24} />
        </TouchableOpacity>
      </View>
      {showLoader ? (
        <SearchPageLoader />
      ) : (
        <>
          <View style={{marginBottom: 120}}>
            {movieData.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={true}
                data={movieData}
                numColumns={2}
                renderItem={SearchMoviesRenderFunction}
                keyExtractor={item => item.id}
              />
            ) : (
              <Text style={styles.noMovieErrorText}>
                Please enter movie name
              </Text>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default SearchMovie;
