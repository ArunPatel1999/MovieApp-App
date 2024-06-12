//import : react components
import React from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/core';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
//import : utils
import {Colors, MyIcon} from 'global/index';
//svg
import DownloadSvg from '../../assets/svg/download 1.svg';
import MyText from 'components/MyText/MyText';

const Header = ({ShowSearchButton, showDownloadButton}) => {
  //variables
  var ICON_SIZE = 30;
  //variables : hook
  const navigation = useNavigation();
  //function : imp function
  const openDrawer = () => {
    console.log('click');
    navigation.dispatch(DrawerActions.openDrawer());
  };
  //UI
  return (
    <View style={styles.HeaderView}>
      <TouchableOpacity onPress={openDrawer}>
        <MyIcon.Feather name="menu" size={30} color={Colors.WHITE} />
      </TouchableOpacity>
      <MyText text={'Moviepur'} fontSize={20} />
      <View>
        {showDownloadButton ? (
          <TouchableOpacity
            hitSlop={{right: 10, top: 10, left: 10, bottom: 10}}
            onPress={() => navigation.navigate('DownloadScreen')}>
            <DownloadSvg />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  HeaderView: {
    backgroundColor: Colors.ONXY,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    shadowColor: Colors.WHITE,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
