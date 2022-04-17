import { StyleSheet } from "react-native";
import { HEIGHT } from "../../global/constants";

export const styles = StyleSheet.create({
	searchView: {
		backgroundColor: "#3d3d3d",
		marginTop: 10,
		marginHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 10,
		borderColor: "#FFF",
		borderWidth: 0.5,
		paddingLeft: 10,
	},
	input: {
		width: "80%",
		fontSize: 16,
		color: "#FFF"
	},
    noMovieErrorText:{
        color: "#FFF",
        textAlign: "center",
        marginTop: HEIGHT / 2.9,
        fontSize: 18 
    }
})
