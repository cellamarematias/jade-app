import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, StatusBar } from "react-native";
import CoinItem from "../components/CoinItem";
import { database } from "../src/firebase/firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs } from "firebase/firestore";
import { NavigationContainer } from '@react-navigation/native';


const Market = ({ navigation }) => {
	const [ coins, setCoins ] = useState([]);
	const [ search, setSearch ] = useState('');
	const [ refreshing, setRefreshing ] = useState(false)
	const [ favs, setFavs ] = useState([]);

	const loadData = async () => {
		const res: any = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
		const data: any = await res.json();
		setCoins(data);
	}

	useEffect(() => {
		console.log('loaded');
		loadData();
	}, []);

	const changeTab = () => {
		navigation.navigate('MyCoins', { screen: 'MyCoins' });
	}

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#141414"/>
			<View style={styles.header}>
				<TextInput style={styles.input}
				autoCapitalize = {"none"}
				placeholder="Search"
				placeholderTextColor='#858585'
				onChangeText={text => { setSearch(text)}}
				/>
				<Text
					style={styles.tittle}
					onPress={changeTab}
					>Favourites →
				</Text>
			</View>
			<FlatList
				refreshing={refreshing}
				onRefresh={ async () => {
					setRefreshing(true);
					await loadData();
					setRefreshing(false);
				}}
				style={styles.list}
				data={
					coins.filter((coin) => coin.name.toLowerCase().includes(search) ||
					coin.symbol.toLowerCase().includes(search))
				}
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

export default Market;