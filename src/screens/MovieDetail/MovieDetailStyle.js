import { StyleSheet } from "react-native";
import { HEIGHT, WIDTH } from "../../global/constants";


export const styles = StyleSheet.create({
	mainView:{
		backgroundColor: "#000",
		flex: 1
	},
	ActivityIndicatorView:{
		height:HEIGHT/1.4,
		justifyContent:"center",
		alignItems:"center",
	},
	imageStyle:{
		height: HEIGHT/2.3,
		width: WIDTH,
		resizeMode: "stretch",
		borderBottomLeftRadius:30,
		borderBottomRightRadius:30,
	},
	mainButtonView:{
		justifyContent: "center",
		alignItems: "center"
	},
	buttonView:{
		height: 60,
		width: 200,
		borderRadius: 30,
		borderWidth: 1,
		flexDirection: "row",
		borderColor: "#FFF",
		justifyContent: "space-around", 
		alignItems: "center"
	},
	ratingView:{
		flexDirection: "row",
		alignItems: "center",
		marginTop: 20
	},
	ratingRuntime:{
		flexDirection: "row",
		 marginLeft: 10
	},
	ratingTitle:{
		color: "red",
		fontSize: 16,
		marginLeft: 5
	},
	ratingTextView:{
		marginLeft: 10, 
		alignItems: "center"
	},
	ratingText:{
		color: "#FFF",
		 fontSize: 12,
		  marginLeft: 5
	},
	primaryTextStyle:{
		color: "#FFF", 
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold"
	},
	secondaryTextViewStyle:{
		paddingHorizontal: 10,
		width:WIDTH,
		marginTop: 3,
		flexDirection: "row",
		alignItems: "center"
	},
	secondaryTextTitleStyle:{
		color: "red",
		fontSize: 16,
		fontWeight: "bold" 
	},
	secondaryTextStyle:{
		color: "#FFF",
		width:"80%",
		fontSize: 12,
		marginLeft: 10 
	}

})