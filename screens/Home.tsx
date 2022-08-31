import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  // si queremos reloguer, descomentar la linea de abajo y recargar
  // AsyncStorage.setItem("token", "");
  return <Text>Home screen</Text>;
};

export default Home;
