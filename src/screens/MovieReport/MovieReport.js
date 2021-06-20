//react components
import React, { useEffect, useState } from 'react';
import {
	 Text,
	View, ScrollView,
	TouchableOpacity, Dimensions,
	Alert,KeyboardAvoidingView,
	TextInput
} from 'react-native';
//custom components
import Header from '../../components/Header/Header';
//styles
import { styles } from './MovieReportStyles';
//service 
import * as service from "./MovieReportService";


const MovieReport = ({ }) => {

	//states
	const[movieName,setMovieName]=useState('');
	const[reportReason,setReportReason]=useState('');
	//function : service function
	const sendReport=async()=>{
		if (movieName) {
			if (reportReason) {
					try {
						const report=`${"Movie Name :"+movieName+", Reason for report:"+reportReason}`;
						const resp=await service.sendReport(report);
						if (resp.data) {
							Alert.alert("Thank you 🙏","your report has been recorded \nEnjoy our service");
							setMovieName('');
							setReportReason('');
						}
					} catch (error) {
						Alert.alert(`${error.response.data}`)
					}
			} else {
				Alert.alert("Oops","Please enter report for reason");
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
                Movie Report
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
				    Reason for report
				</Text>
				<TextInput
				value={reportReason}
				onChangeText={(text)=>setReportReason(text)}
                numberOfLines={5}
                multiline={true}
				style={styles.inputText}
				placeholder="Enter your reason for report"
				placeholderTextColor="#FFF"
				/>
			</View>
			<TouchableOpacity
            onPress={()=>sendReport()}
            style={styles.buttonViewStyle}>
            <Text style={styles.buttonTextStyle}>
                Send Request
            </Text>
            </TouchableOpacity>
		</ScrollView>
        <View style={{justifyContent:"flex-end",flex:1,margin:10}}>
            <Text style={{...styles.textStyle,fontSize:10}}>
              {`*** Report ***\nThis app is only for entertainment purposes if you have any problem with content please report it` }
            </Text>
        </View>
        </KeyboardAvoidingView>
	)
}

export default MovieReport;
