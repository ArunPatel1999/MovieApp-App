//import : react components
import React, {useEffect} from 'react';
import {Text, View, ActivityIndicator, Alert} from 'react-native';
//import : style
import {styles} from './SplashStyle';
//import : service
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : third parties
import messaging from '@react-native-firebase/messaging';
//import : utils
import {Server} from 'global/index';
//import : redux
import {connect} from 'react-redux';
import {UserAction} from '../../redux/actions';

const Splash = ({navigation, dispatch}) => {
  //function
  //pending file reading and writng
  const createUser = async (id = null, token) => {
    try {
      const postData = {
        id: id,
        token: token,
      };

      const {response, status} = await Server.postAPI(Server.user, postData);
      if (status) {
        const user = JSON.stringify(response);
        await AsyncStorage.setItem('accessId', user);
        dispatch(UserAction.setAccessId(response));
        navigation.replace('Bottomtabs');
      }
    } catch (error) {
      console.error('error in createUser', error);
    }
  };
  const onLoad = async () => {
    const Permission = await messaging().hasPermission();
    if (Permission == 1) {
      const token = await messaging().getToken();
      const EnAccessId = await AsyncStorage.getItem('accessId');
      const accessId = JSON.parse(EnAccessId);
      if (accessId) {
        dispatch(UserAction.setAccessId(accessId));
        navigation.replace('Bottomtabs');
      } else {
        createUser(null, token);
      }
    } else {
      Alert.alert('Oops', 'please try again some time later');
    }
  };

  //hook : useEffect
  useEffect(() => {
    onLoad();
  }, []);
  //UI
  return (
    <View style={styles.container}>
      <Text style={styles.TextStyle}>Moviepur</Text>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(null, mapDispatchToProps)(Splash);
