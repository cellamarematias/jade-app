import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, StatusBar, TouchableOpacity } from "react-native";
import CoinItem from "../components/CoinItem";
import MyCoinsItem from "../components/MyCoinsItem";
import { database } from "../src/firebase/firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { NavigationContainer } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

let filteredCoins = [];

const MyCoins = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(true);
	const initialState = [];
  const [ favs, setFavs ] = useState([]);
  const [ favCoins, setFavCoins ] = useState([]);
	const [ coins, setCoins ] = useState([]);
	const [ search, setSearch ] = useState('');
	const [ refreshing, setRefreshing ] = useState(false)
	let uid = '';

	const resetState = () => {
    setFavs([]);
		setFavCoins([]);
  };

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
        setIsLoading(false);
      })
			.then((response) => readFavs())
  }, []);

	const readFavs = async () => {
		uid = await AsyncStorage.getItem('uid');
		const q = query(collection(database, "favs"), where("uid", "==", uid));
		const querySnapshot = await getDocs(q);
		resetState();
		querySnapshot.forEach((doc) => {
			setFavs(favs => [...favs, doc.data().coin]);
	})

	setTimeout(function(){
		filter();
		setFavCoins(filteredCoins);
	}, 2000);

	}

	const filter = () => {
		console.log('dentro de filter', coins.length);
		filteredCoins = [];
		coins.filter((coin) =>{
			for (let i = 0; i < favs.length; i++) {
				if(favs[i].name === coin.name)
				{
					filteredCoins.push(coin)
				}
			}
		} )
		setFavCoins(filteredCoins);
		console.log('al final de filter', filteredCoins.length)
	}

	useFocusEffect(
		React.useCallback(() => {
			readFavs();
			filter();
		}, [])
	);

	useEffect(() => {
		readFavs();
		filter();
  }, []);

console.log(filteredCoins.length)


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
					await filter();
					setRefreshing(false);
				}}
				style={styles.list}
				data={filteredCoins}
        renderItem={({item}) => {
					return <MyCoinsItem coin={item}/>
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