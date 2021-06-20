//react components
import React, { useEffect, useState } from 'react';
import {
	 Text,
	View, ScrollView,
    KeyboardAvoidingView,
	TouchableOpacity, Dimensions,
	Image,
    TextInput,
    Alert
} from 'react-native';
//custom components
import Header from '../../components/Header/Header';
//styles
import { styles } from './MovieFeedbackStyle';
//service
import * as service from "./MovieFeedbackService";


const MovieFeedback = ({ }) => {

    //states
    const [feedBack,setFeedBack]=useState('');
    //function : service function
    const sendFeedBack=async()=>{
        if (feedBack) {
            try {
                const resp=await service.sendFeedBack(feedBack);
                if (resp.data) {
                    Alert.alert("Thank you 🙏","your valuable feedback has been recorded \nEnjoy our service");
                    setFeedBack('');
                }
            } catch (error) {
                Alert.alert(`${error.response.data}`)
            }
        }
        else{
            Alert.alert("Oops","Please enter feedback")
        }
    }

    //UI
	return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
            <Header/>
		<ScrollView>
			<Text style={styles.titleStyle}>
                Feedback
            </Text>
            <TextInput
            value={feedBack}
            onChangeText={(text)=>setFeedBack(text)}
            style={styles.textInput}
            multiline={true}
            numberOfLines={10}
            placeholder="Enter your valuable feedback here"
            placeholderTextColor="#FFF"
            />
            <TouchableOpacity
            onPress={()=>sendFeedBack()}
            style={styles.buttonViewStyle}>
            <Text style={styles.buttonTextStyle}>
                Send Feedback
            </Text>
            </TouchableOpacity>
		</ScrollView>
        </KeyboardAvoidingView>
	)
}

export default MovieFeedback;
