//react components
import React, { useEffect } from 'react'
import { 
	 Text,
	 View, ActivityIndicator,
	  Alert
} from 'react-native';
//style
import {styles} from './SplashStyle';
//service
import * as service from "./SplashService";
import AsyncStorage from '@react-native-async-storage/async-storage';
//firebase
import messaging from '@react-native-firebase/messaging';
//redux
import * as UserAction from "../../redux/actions/userActions";
import { connect } from 'react-redux';

const Splash = ({ navigation,dispatch }) => {
	//function
	const checkUserExists= async(token)=>{
		try {
			const resp=await service.checkUserExists(token);
			if (resp.data) {
				getUserByToken(token)
			} else {
				createUserWithToken(token)
			}
		} catch (error) {
			console.log("error in createUserWithToken",error);
		}
	}
	const getUserByToken=async(token)=>{
		try {
			const resp=await service.getUserByToken(token);
			if (resp.data) {
				const user = JSON.stringify(resp.data)
    			await AsyncStorage.setItem('userInfo', user)
				dispatch(UserAction.setUser(resp.data));
				navigation.replace("Bottomtabs");
			} else {
				Alert.alert("Oops","please try again some time later")
			}
		} catch (error) {
			console.log("error in getUserByToken",error);
		}
	}
	const createUserWithToken=async(token)=>{
		try {
		const resp=await service.createUserWithToken(token);
			if (resp.data) {
				//set user in async
				const user = JSON.stringify(resp.data)
    			await AsyncStorage.setItem('userInfo', user)
				//dispatch user in redux
				dispatch(UserAction.setUser(resp.data));
				navigation.replace("Bottomtabs");
		} else {
			Alert.alert("Oops","please try again some time later")
		}
		} catch (error) {
			console.log("error in createUserWithToken",error);
		}
	}
	const onLoad=async()=>{
		const Permission = await messaging().hasPermission()
		if (Permission==1) {
			const token = await messaging().getToken();
			const userInfo = await AsyncStorage.getItem('userInfo');
			const userData = JSON.parse(userInfo)
			if (userData) {
				dispatch(UserAction.setUser(userData));
				navigation.replace("Bottomtabs");
			}
			else{
				checkUserExists(token);
			}
		}
		else{
			Alert.alert("Oops","please try again some time later")
		}
	}

	//useEffect
	useEffect(()=>{
		onLoad()
		},[])
	return (
		<View style={styles.container}>
			<Text style={styles.TextStyle}>Moviepur</Text>
			<View style={{ height: 30 }} />
			<ActivityIndicator size="large" color="#00ff00" />
		</View>
	)
}

const mapDispatchToProps=(dispatch)=>({dispatch});

export default connect(null,mapDispatchToProps) (Splash);


