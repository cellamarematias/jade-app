import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Navigation from "./Navigation/LoggedNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
