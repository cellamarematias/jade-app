import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logout = () => {
  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        AsyncStorage.setItem("displayName", "");
        AsyncStorage.setItem("email", "");
      })
      .catch((error) => {
        console.log("an error has ocurred", error);
      });
  };

  logOut();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>See you later !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6053DD",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 26,
    letterSpacing: 1.3,
    fontWeight: "600",
  },
});

export default Logout;
