import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
// redux actions


export default function Home() {
  const [displayName, setDisplayName] = useState("");

  const getData = async () => {
    try {
      const displayName = await AsyncStorage.getItem('displayName');
      setDisplayName(displayName!)
      if(displayName !== null) {
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }

  getData();

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