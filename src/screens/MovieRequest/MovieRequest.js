//react components
import React, { useEffect, useState } from 'react';
import {
	 Text,
	View, FlatList,ScrollView,
	TouchableOpacity, Dimensions,
	Alert,KeyboardAvoidingView,
	TextInput
} from 'react-native';
//custom components
import Header from '../../components/Header/Header';
//styles
import { styles } from './MovieRequestStyle';
//service 
import * as service from "./MovieRequestService";


const MovieRequest = ({ }) => {

	//states
	const[movieName,setMovieName]=useState('');
	const[releaseYear,setReleaseYear]=useState('');
	const[movieType,setMovieType]=useState('');
	//function : service function
	const sendRequest=async()=>{
		if (movieName) {
			if (releaseYear) {
				if (movieType) {
					try {
						const request=`${"Movie Name :"+movieName+", Release Year :"+releaseYear+", Movie Type :"+movieType}`;
						const resp=await service.sendRequest(request);
						if (resp.data) {
							Alert.alert("Thank you 🙏","your request has been recorded \nEnjoy our service");
							setMovieName('');
							setReleaseYear('');
							setMovieType('');
						}
					} catch (error) {
						Alert.alert("Oops",`${error.response.data}`)
					}
					
				} else {
					Alert.alert("Oops","Please enter movie type");
				}
			} else {
				Alert.alert("Oops","Please enter release year");
			}
		}
		else{
			Alert.alert("Oops","Please enter movie name");
		}
	}
	//Ui
	return (
		<KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
            <Header/>
		<ScrollView>
			<Text style={styles.titleStyle}>
                Movie Request
            </Text>
			<View style={styles.viewStyle}>
				<Text style={styles.textStyle}>
					Movie name
				</Text>
				<TextInput
				value={movieName}
				onChangeText={(text)=>setMovieName(text)}
				style={styles.inputText}
				placeholder="Enter movie name"
				placeholderTextColor="#FFF"
				/>
			</View>
			<View style={styles.viewStyle}>
				<Text style={styles.textStyle}>
					Release year
				</Text>
				<TextInput
				value={releaseYear}
				onChangeText={(text)=>setReleaseYear(text)}
				maxLength={4}
				style={styles.inputText}
				keyboardType="number-pad"
				placeholder="Enter release year"
				placeholderTextColor="#FFF"
				/>
			</View>
			<View style={styles.viewStyle}>
				<Text style={styles.textStyle}>
					Movie type
				</Text>
				<TextInput
				value={movieType}
				onChangeText={(text)=>setMovieType(text)}
				style={styles.inputText}
				placeholder="Enter type(Hollywood,Bollywood,Tollywood)"
				placeholderTextColor="#FFF"
				/>
			</View>
			<TouchableOpacity
            onPress={()=>sendRequest()}
            style={styles.buttonViewStyle}>
            <Text style={styles.buttonTextStyle}>
                Send Request
            </Text>
            </TouchableOpacity>
		</ScrollView>
		 </KeyboardAvoidingView>
	)
}

export default MovieRequest;
