import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
// redux actions


export default function Home() {
  const [displayName, setDisplayName] = useState("");
  const [ coins, setCoins ] = useState([]);


	const loadData = async () => {
		console.log('data');
		const res: any = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
		const data: any = await res.json();
		console.log(data);
		setCoins(data);
	};

  useEffect(() => {
		console.log('loaded');
		loadData();
	}, []);

  return (
    <View style={styles.container}>
      <Text>HOME</Text>
      <Text>{displayName}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});