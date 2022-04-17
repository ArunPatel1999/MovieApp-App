import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

//svg
import DownloadSvg from "../../assets/svg/download 1.svg";
import SearchSvg from "../../assets/svg/search.svg";
import BackSvg from "../../assets/svg/left-arrow 1.svg";
const Header = ({ ShowSearchButton, showDownloadButton }) => {
	const navigation = useNavigation()
	return (
		<View>
			<View style={styles.HeaderView}>
				<View>
					{
						ShowSearchButton ?
							<TouchableOpacity
								hitSlop={{ right: 10, top: 10, left: 10, bottom: 10 }}
								onPress={() => navigation.navigate("SearchMovie")}>
								<SearchSvg />
							</TouchableOpacity>
							:
							<TouchableOpacity
								hitSlop={{ right: 10, top: 10, left: 10, bottom: 10 }}
								onPress={() => navigation.pop()}>
								<BackSvg />
							</TouchableOpacity>
					}

				</View>
				<Text style={styles.headerTitle}>Moviepur</Text>
				<View>
					{
						showDownloadButton ?
							<TouchableOpacity
								hitSlop={{ right: 10, top: 10, left: 10, bottom: 10 }}
								onPress={() => navigation.navigate("DownloadScreen")}>
								<DownloadSvg />
							</TouchableOpacity>
							:
							null
					}

				</View>
			</View>
			<View style={{ height: 2, backgroundColor: "#e8e8e8" }} />
		</View>
	)
}

export default Header

const styles = StyleSheet.create({
	HeaderView: {
		backgroundColor: "#000",
		height: 60,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 10,
	},
	headerTitle: {
		color: "#FFF",
		fontSize: 22,
		fontWeight: "bold",
		textAlign: "center"
	}
})
