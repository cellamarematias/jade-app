import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const CoinItem = ({coin}) => {
	const onPress = () => {
		console.log(coin.name);
	}
  return (
		<TouchableOpacity
		onPress={onPress}
		style={styles.containerItem}>
			<View style={styles.coinName}>
				<Image
					style={styles.image}
					source={{uri:coin.image}}
				/>
			<View  style={styles.containerNames}>
				<Text style={styles.text}>{coin.name}</Text>
				<Text style={styles.symbol}>{coin.symbol}</Text>
			</View>
			</View>
			<View>
				<Text style={styles.textPrice}>${coin.current_price}</Text>
				<Text style={[styles.pricePercentage, coin.price_change_percentage_24h > 0 ? styles.priceUp : styles.priceDwon]}>{coin.price_change_percentage_24h}</Text>
			</View>
		</TouchableOpacity>
	)
};

const styles = StyleSheet.create({
	containerItem: {
		backgroundColor: '#121212',
		paddingTop: 10,
		flexDirection: "row",
		justifyContent: 'space-between'

	},
	containerNames: {
		marginLeft: 10
	},
	coinName: {
		flexDirection: 'row'
	},
	text: {
		color: '#ffffff'
	},
	textPrice: {
		color: '#fff',
		textAlign: 'right'
	},
	image: {
		width: 30,
		height: 30
	},
	symbol: {
		color: '#434343',
		textTransform: 'uppercase'
	},
	pricePercentage: {
		textAlign: 'right'
	},
	priceUp: {
		color: '#00B5B9'
	},
	priceDwon: {
		color: '#fc4422'
	},
})

export default CoinItem;