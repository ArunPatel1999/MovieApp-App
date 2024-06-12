import React from 'react';
import {Image, NavigatorIOS, TouchableOpacity} from 'react-native';

//styles
import {styles} from './CarouselStyle';
import {useNavigation} from '@react-navigation/native';

const CarouselItem = ({item}) => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    if (item.id == 1) {
      navigation.navigate('MovieListing');
    } else if (item.id == 2) {
      navigation.navigate('SpecialSection');
    } else {
      navigation.navigate('AllMovie', {flag: 4});
    }
  };

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      activeOpacity={0.8}
      style={styles.itemCon}>
      <Image
        resizeMode="stretch"
        source={{uri: item.imageUrl}}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 20,
        }}
      />
    </TouchableOpacity>
  );
};
export default React.memo(CarouselItem);
