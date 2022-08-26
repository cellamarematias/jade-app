import React from 'react';
import { View, Text, StyleSheet, Image } from "react-native";

const Header = (props) => (
  <View key={props.id} style={styles.container}>
		<View style={styles.row}>
			<Text style={styles.coin}>BTC:</Text>
			<Text style={styles.value}>21385</Text>
		</View>
		<View style={styles.row}>
			<Text style={styles.coin}>BTC:</Text>
			<Text style={styles.value}>2594</Text>
		</View>
		<View style={styles.row}>
			<Text style={styles.coin}>BTC:</Text>
			<Text style={styles.value}>3648</Text>
		</View>
  </View>
)

const styles = StyleSheet.create({
  container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
		alignItems: 'center',
		width: '95%',
		backgroundColor: '#32089A',
    padding: 15,
		paddingStart: 25,
    paddingBottom: 5,
    paddingTop: 5,
		marginTop: 10,
		shadowColor: "white",
		shadowOpacity: 0.5,
		width: '100%'
  },
	row: {
		flexDirection: 'row',
		margin: 2,
		marginEnd: 10
	},
	coin: {
		textTransform: 'uppercase',
		fontSize: 17,
		marginRight: 7
	},
	value: {
		color: '#ABFB5C',
		fontSize: 17,
		marginRight: 7
	},
  image: {
    width: 58,
    height: 48,
    borderRadius: 4
  },
	tinyLogo: {
    width: 60,
    height: 60,
  },
	center: {
		justifyContent: 'center'
	},
	heading: {
		justifyContent: 'center',
		paddingLeft: 8,
		maxWidth: '90%',
		fontWeight: 'bold',
	}
})


export default Header;