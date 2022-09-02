import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, StatusBar, TouchableOpacity } from "react-native";
import CoinItem from "../components/CoinItem";
import { database } from "../src/firebase/firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { NavigationContainer } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';


let favo = [];



const MyCoins = ({ navigation }) => {
  const [ favs, setFavs ] = useState([]);
	const [ favs2, setFavs2 ] = useState([]);


	console.log(typeof(favs[0]))

	let uid = '';

	const readFavs = async () => {
		uid = await AsyncStorage.getItem('uid');
		const q = query(collection(database, "favs"), where("uid", "==", uid));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			favo.push(doc.data().coin)
			setFavs(favs => [...favs, doc.data().coin]);
	});
	}


	const [ coins, setCoins ] = useState([]);
	const [ search, setSearch ] = useState('');
	const [ refreshing, setRefreshing ] = useState(false)

	const loadData = async () => {
		const res: any = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
		const data: any = await res.json();
		setCoins(data);
	}

		// join both array with the matches
	const filter = coins.filter(coin => {
			if (favs.includes(coin.name)) {
				return coin;
				}
		});

	console.log(filter);


	useEffect(() => {
		//console.log('soy el useEffect');
		loadData();
		readFavs();
	}, []);


  useFocusEffect(
    React.useCallback(() => {
			loadData();
			readFavs();
			console.log('soy el useEffect');
    }, [])
  );


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
				onRefresh={ async () => {
					setRefreshing(true);
					await loadData();
					setRefreshing(false);
				}}
				style={styles.list}
				data={filter}
        renderItem={({item}) => {
					return <CoinItem coin={item}/>
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
    backgroundColor: '#141414',
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