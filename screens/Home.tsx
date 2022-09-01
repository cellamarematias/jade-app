import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { app } from "../src/firebase/Firebase";
import LogOutButton from "../components/shared/LogOutButton";

const Home = () => {
  return (
    <View>
      <Text>home screen</Text>
      <LogOutButton />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
