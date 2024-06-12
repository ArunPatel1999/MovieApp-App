//import : react components
import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
//import : styles
import {styles} from './CustomDrawerStyle';
import MyText from 'components/MyText/MyText';
import {Colors, MyIcon} from 'global/index';

const CustomDrawer = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require('assets/images/logo.png')}
        style={{
          height: 100,
          width: 100,
          alignSelf: 'center',
          borderRadius: 100,
        }}
      />
      <MyText text={'Moviepur'} textAlign="center" />
      <View style={styles.drawerContent}>
        <DrawerItem
          title={'Search'}
          icon={
            <MyIcon.AntDesign name="search1" size={24} color={Colors.WHITE} />
          }
          onPress={() => navigation.navigate('SearchMovie')}
        />
        <DrawerItem />
        <DrawerItem />
        <DrawerItem />
        <DrawerItem />
      </View>
    </View>
  );
};

export default CustomDrawer;

const DrawerItem = ({title, icon, onPress = () => {}}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 0.5,
        marginVertical: 10,
        borderColor: Colors.WHITE,
        padding: 10,
      }}>
      <MyText text={title} fontSize={16} />
      {icon}
    </Pressable>
  );
};
