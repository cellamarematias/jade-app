import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { app } from "../../src/firebase/Firebase";

const LogOutButton = () => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => app.auth().signOut()}>
      <Text>logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
    backgroundColor: "red",
    flex: 1,
  },
});

export default LogOutButton;
