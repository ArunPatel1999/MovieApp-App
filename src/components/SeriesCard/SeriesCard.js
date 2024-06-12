//react components
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
//styles
import {WIDTH} from '../../global/constants';
import {Colors, ScreenNames} from '../../global';
//naviation
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';

const SeriesCard = ({item, onPress, imageUrl}) => {
  //variables
  const navigation = useNavigation();

  //UI
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(ScreenNames.TVSERIES_DETAIL, {id: item.id})
      }
      style={styles.container}>
      <Image style={styles.ImageStyle} source={{uri: imageUrl}} />
      <View style={{height: '25%', marginTop: 5}}>
        <Text
          numberOfLines={2}
          style={{
            color: Colors.WHITE,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          {item.name}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            color: Colors.WHITE,
            fontSize: 12,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          {item.year}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SeriesCard;

const styles = StyleSheet.create({
  container: {
    width: WIDTH / 2.2,
    height: 210,
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
