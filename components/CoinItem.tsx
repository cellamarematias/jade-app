import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { database } from "../src/firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


const CoinItem = ({coin}) => {
	// observador de ususario
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		//funcion para guardar el id del ususario en la session
		const storeData = async (value) => {
			try {
				await AsyncStorage.setItem('uid', value)
			} catch (e) {
				// saving error
			}
		}
		if (user) {
			let uid = user.uid;
			storeData(uid);
			// ...
		} else {
			// User is signed out
			// ...
		}
	});

	let uid = '';

	const save = async (coin: any) => {
		uid = await AsyncStorage.getItem('uid');
		console.log('dentro de la funcion save ', uid)
		try {
			const docRef = await addDoc(collection(database, "favs"), {
				uid,
				coin,
			});
			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}

	const onPress = () => {
		save(coin.name);
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