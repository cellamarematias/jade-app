import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Logout = () => {
  const logOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      AsyncStorage.setItem('displayName', '');
      AsyncStorage.setItem('email', '')
			alert('Logged out!')
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

	logOut();

  return (
    <View style={styles.container}>
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

export default Logout;