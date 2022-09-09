import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { collection, addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { database } from "../../src/firebase/Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';



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
		save(coin);
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
			<View style={styles.containerPrices}>
				<Text style={styles.textPrice}>${coin.current_price}</Text>
				<Text style={[styles.pricePercentage, coin.price_change_percentage_24h > 0 ? styles.priceUp : styles.priceDwon]}>{coin.price_change_percentage_24h}</Text>

			</View>
			{/* <TouchableOpacity onPress={onPress}>
				<AntDesign name="hearto" size={20} color="white" />
			</TouchableOpacity> */}
		</TouchableOpacity>
	)
};

const styles = StyleSheet.create({
	containerItem: {
		backgroundColor: 'rgb(19, 0, 64)',
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
	containerPrices: {
		alignContent:'center'
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