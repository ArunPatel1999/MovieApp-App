import {View, Text} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors, Constants} from 'global/index';
const HomePageLoader = () => {
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
            height: Constants.HEIGHT / 4,
            borderRadius: 10,
            marginBottom: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: BAR_HEIGHT,
            marginVertical: 10,
          }}>
          <View style={{height: '100%', width: '70%'}} />
          <View style={{height: '100%', width: '20%'}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10,
            height: BOX_HEIGHT,
          }}>
          <View style={{height: '100%', width: '48%'}} />
          <View style={{height: '100%', width: '48%'}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: BAR_HEIGHT,
            marginVertical: 10,
          }}>
          <View style={{height: '100%', width: '70%'}} />
          <View style={{height: '100%', width: '20%'}} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10,
            height: BOX_HEIGHT,
          }}>
          <View style={{height: '100%', width: '48%'}} />
          <View style={{height: '100%', width: '48%'}} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default HomePageLoader;
