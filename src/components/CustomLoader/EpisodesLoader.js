import {View, Text} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors, Constants} from 'global/index';
const EpisodesLoader = () => {
  var BAR_HEIGHT = 40;
  var BOX_HEIGHT = 200;
  return (
    <SkeletonPlaceholder
      speed={1000}
      backgroundColor={Colors.ANOTHER_BLACK}
      borderRadius={4}>
      <View style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: Constants.HEIGHT / 5,
            marginBottom: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: Constants.HEIGHT / 5,
            marginBottom: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: Constants.HEIGHT / 5,
            marginBottom: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: Constants.HEIGHT / 5,
            marginBottom: 10,
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
};

export default EpisodesLoader;
