import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, StatusBar, TouchableOpacity } from "react-native";
import CoinItem from "../components/CoinItem";
import MyCoinsItem from "../components/MyCoinsItem";
import { database } from "../src/firebase/firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { NavigationContainer } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { contains } from "@firebase/util";

const MyCoins = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(true);
  const [ favs, setFavs ] = useState([]);
	const [ search, setSearch ] = useState('');
	const [ refreshing, setRefreshing ] = useState(false)
	let uid = '';

	const callback = () => {
		console.log('callback from child');
		readFavs();
	}

	const resetState = () => {
    setFavs([]);
	};

	const readFavs = async () => {
		uid = await AsyncStorage.getItem('uid');
		const q = query(collection(database, "favs"), where("uid", "==", uid));
		const querySnapshot = await getDocs(q);
		resetState();
		querySnapshot.forEach((doc) => {
			setFavs(favs => [...favs, doc.data().coin]);
	})
	}

	useFocusEffect(
		React.useCallback(() => {
			readFavs();
		}, [])
	);

	useEffect(() => {
		readFavs();
	}, []);

const changeTab = () => {
	navigation.navigate('Market', { screen: 'Market' });
}

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#141414"/>
			<View style={styles.header}>
				<Text style={styles.tittle}>Favourites</Text>
				<Text
				style={styles.tittle}
				onPress={changeTab}
				>See all →</Text>
			</View>
			<View style={styles.header}>
				<TextInput style={styles.input}
				autoCapitalize = {"none"}
				placeholder="Search"
				placeholderTextColor='#858585'
				onChangeText={text => { setSearch(text)}}
				/>
			</View>
			<FlatList
				refreshing={refreshing}
				onRefresh={ () => {
					setRefreshing(true);
					setRefreshing(false);
				}}
				style={styles.list}
				data={favs}
        renderItem={({item}) => {
					return <MyCoinsItem coin={item} callback={callback}/>
				}}
				showsVerticalScrollIndicator={false}
				/>
		</View>
	)
};

const styles = StyleSheet.create({
	header: {
		marginTop: 25,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '90%'
	},
	input: {
		color: '#fff',
		borderBottomColor: '##4657CE',
		borderBottomWidth: 1,
		width: '40%',
		textAlign: 'center'
	},
	tittle: {
		color: '#fff',
		marginTop: 10,
		fontSize: 20
	},
  container: {
    backgroundColor: 'rgb(19, 0, 64)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
	list: {
		width: '90%'
	},

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
	Headercontainer: {
		flexDirection: 'row',
		marginBottom: 40
	},
	headerOne: {
		backgroundColor: '#130040',
		color: 'white',
		fontSize: 40,
		fontWeight: 'bold',
		textTransform: 'uppercase'
	},
	headerTwo: {
		backgroundColor: '#130040',
		color: '#ABFB5C',
		fontSize: 40,
		fontWeight: 'bold',
		textTransform: 'uppercase'
	},
	subheading: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		marginBottom: 20
	}
});

export default MyCoins;