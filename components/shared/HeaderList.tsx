import { View, Text, StyleSheet } from "react-native";
import React from "react";

const HeaderList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name</Text>
      <Text style={[styles.text, styles.fixText]}>Price</Text>
      <Text style={styles.text}>Fav</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
		marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "auto",
    backgroundColor: "#130040",
  },
  text: {
    color: "#6053DD",
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "500",
  },
  fixText: {
    paddingLeft: 37,
  },
});

export default HeaderList;
