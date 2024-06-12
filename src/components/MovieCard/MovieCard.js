import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
  SectionList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {HEIGHT, WIDTH} from '../../global/constants';
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';
const MovieCard = ({item, onPress, imageUrl}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetail', {id: item.id})}
      // onPress={()=>onPress()}
      style={styles.container}>
      <Image style={styles.ImageStyle} source={{uri: imageUrl}} />
      <View style={{marginTop: 5, height: '30%'}}>
        <Text
          numberOfLines={1}
          style={{
            color: '#FFF',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {item.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            color: '#FFF',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {item.year}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    width: WIDTH / 2.2,
    height: 200,
    backgroundColor: '#383838',
    margin: 10,
    borderWidth: 0.5,
    padding: 3,
    borderRadius: 10,
  },
  ImageStyle: {
    height: '70%',
    width: '100%',
    resizeMode: 'stretch',
    borderRadius: 10,
  },
});
