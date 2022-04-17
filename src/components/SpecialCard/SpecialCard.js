import React from 'react';
import {
	StyleSheet, Text,
	View, ActivityIndicator,
	FlatList, Dimensions, SectionList,
	TouchableOpacity, Image, ScrollView
} from 'react-native';
import { WIDTH } from '../../global/constants';
import { useNavigation } from '@react-navigation/core';
const SpecialCard=({item})=>{
    const navigation = useNavigation()
    return(
		<TouchableOpacity
        onPress={() => navigation.navigate("AllMovie", { id: item.id,flag:3,movieName:item.name })}
                // onPress={()=>onPress()}
				style={styles.container}>
                    <View>
                        <Image style={styles.ImageStyle} 
                        source={{ uri: item.imageUrl }} />
                    </View>
				<View style={{ marginLeft:10, width:WIDTH/3,justifyContent:"center",alignItems:"center"}}>
					<Text numberOfLines={2} style={{color:"#fff",
                    marginTop:-10,
                    marginBottom:10,
                    fontSize:18,
                    fontWeight:"bold"}}>{item.name}</Text>
                    <Text numberOfLines={2} style={{color:"#fff",
                    fontSize:14,
                    fontWeight:"bold"}}>Total Parts : {item?.movies?.length}</Text>
				</View>
		</TouchableOpacity>
    )
}

export default SpecialCard;

const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
        backgroundColor: "#383838",
        marginHorizontal:20,
        height:180,
        padding:10,
        borderRadius:20,
    },
    ImageStyle:{
        height: "100%",
        width:WIDTH/2,
        borderRadius:20,
        resizeMode:"stretch"
    }
})