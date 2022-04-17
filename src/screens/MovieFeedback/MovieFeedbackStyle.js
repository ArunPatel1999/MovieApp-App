import { StyleSheet } from "react-native";
import { WIDTH } from "../../global/constants";

export const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#000"
    },
    titleStyle:{
        color:"#fff",
        textAlign:"center",
        fontSize:16,
        fontWeight:"bold",
        marginVertical:20,
    },
    textInput:{
        borderWidth:0.5,
        width:WIDTH-20,
        borderColor:"#FFF",
        marginVertical:20,
        borderRadius:10,
        marginHorizontal:10,
        backgroundColor:"#3c465c",
        color:"#FFF",
        fontSize:16,
        paddingHorizontal:10,
    },
    buttonViewStyle:{
        marginVertical:20,
        borderColor:"#FFF",
        backgroundColor:"#3c465c",
        alignSelf:"center",
        borderRadius:10,
        padding:10,
        borderWidth:0.5,
    },
    buttonTextStyle:{
        color:"#FFF"
    }
})