import { StyleSheet } from "react-native";
import { HEIGHT } from "../../global/constants";

export const styles = StyleSheet.create({
	fullView: {
		backgroundColor: "#000",
		flex: 1,
	},
	container: {
		flexDirection: "row",
		backgroundColor: "#292929",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		alignItems: "center",
		height: 50,
	},
	TextView: {
		fontSize: 18,
		color: "#FFF",
		fontWeight: "bold",
	},
	ActivityIndicatorView:{
		height:HEIGHT/1.4,
		justifyContent:"center",
		alignItems:"center",
	}

})