import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Modal, Pressable, Button } from "react-native";
import { collection, addDoc, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { database } from "../../src/firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AntDesign, Ionicons } from '@expo/vector-icons';

let uid = '';
let docId = '';

const MyCoinsItem = ({coin, callback}) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [modalDelete, setModalDelete] = useState(false);

	const [ coinPrice, setCoinPrice ] = useState({
		id: '',
		price: '',
		dolar: '',
		image: '',
		price_change_percentage_24h: 0
	});


  const showConfirmDialog = (coin) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this Coin?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
						deleteCoin(coin);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

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

	const deleteCoin = async (coin: any) => {
		uid = await AsyncStorage.getItem('uid');
		try {
			const q = query(collection(database, "favs"), where("uid", "==", uid), where("coin.name", "==", coin));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				// console.log(doc.id)
				docId = doc.id
		});
			const docRef = doc(database, 'favs', docId);
			deleteDoc(docRef)
			} catch (e) {
				console.error("Error deleting document: ", e);
			}
			callback();
	}



	const seeMarket = async (coin) => {
		const res: any = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`)
		const data: any = await res.json();
		await setCoinPrice({
			id: data.name,
			price: data.market_data.current_price.ars,
			dolar: data.market_data.current_price.usd,
			image: data.image.small,
			price_change_percentage_24h: data.price_change_percentage_24h
		});
		setModalVisible(true)
	}


	const onPress = () => {
		deleteCoin(coin.name);
	}



  return (

		<>
		<View style={styles.centeredView}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				} }
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
					<Text style={styles.modalText}>{coinPrice.id}</Text>
					<Image
						style={styles.image}
						source={{ uri: coinPrice.image }} />
						<Text style={styles.modalText}>ARS ${coinPrice.price}</Text>
						<Text style={styles.modalText}>U$D{coinPrice.dolar}</Text>
						<Text style={[styles.pricePercentage, coin.price_change_percentage_24h > 0 ? styles.priceUp : styles.priceDown]}>
							{coin.price_change_percentage_24h > 0 ? <AntDesign name="caretup" size={13} color="green" /> : <AntDesign name="caretdown" size={13} color="red" />} {coin.price_change_percentage_24h}
						</Text>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Text style={styles.textStyle}>Close</Text>
						</Pressable>
					</View>
				</View>
			</Modal>

			{/* MODAL Delete */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalDelete}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalDelete(!modalDelete);
				} }
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text>Delete {coin.name}?</Text>
						<View style={styles.modalButtons}>
							<Pressable
									style={[styles.button, styles.buttonYes]}
									onPress={() => {
										setModalDelete(!modalDelete)
										deleteCoin(coin.name)
									}}
								>
									<Text style={styles.textStyle}>Yes</Text>
								</Pressable>
								<Pressable
									style={[styles.button, styles.buttonClose]}
									onPress={() => setModalDelete(!modalDelete)}
								>
									<Text style={styles.textStyle}>No</Text>
								</Pressable>
						</View>
					</View>
				</View>
			</Modal>

		</View><TouchableOpacity
			style={styles.containerItem}>
				<View style={styles.coinName}>
					<Image
						style={styles.image}
						source={{ uri: coin.image }} />
					<View style={styles.containerNames}>
						<Text style={styles.text}>{coin.name}</Text>
						<Text style={styles.symbol}>{coin.symbol}</Text>
					</View>
				</View>
				<View>
					<TouchableOpacity onPress={() => seeMarket(coin.id)}>
						<Text style={styles.text}>{<Ionicons name="pricetag-outline" size={24} color="white" />}</Text>
						{/* <Icon name='monetization-on' color='#00aced' /> */}
					</TouchableOpacity>
				</View>
				<View>
						<TouchableOpacity onPress={() => setModalDelete(true)}>
						<Text style={styles.text}>{<AntDesign name="delete" size={24} color="white" />}</Text>
					</TouchableOpacity>
				</View>
			</TouchableOpacity></>
	)

};

const styles = StyleSheet.create({
	icon: {
		color: '#ffffff'
	},
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
	textPrice: {
		color: '#fff',
		textAlign: 'right'
	},
	image: {
		width: 30,
		height: 30,
		marginBottom: 10
	},
	symbol: {
		color: '#434343',
		textTransform: 'uppercase'
	},
	pricePercentage: {
		textAlign: 'right'
	},
	priceUp: {
		color: 'green'
	},
	priceDown: {
		color: '#fc4422'
	},
	centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
		width: '45%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
	modalButtons : {
		flex: 1,
		flexDirection: "row",
		padding: 2
	},
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  buttonYes: {
		margin: 10,
    backgroundColor: "#4baf73",
  },
  buttonClose: {
		margin: 10,
    backgroundColor: "#db2929",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
		color: "black"
  },
	screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 300,
    height: 300,
    backgroundColor: "red",
    marginBottom: 30,
  }
})

export default MyCoinsItem;