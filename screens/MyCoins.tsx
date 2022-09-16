import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  StatusBar,
} from "react-native";
import CoinFavItem from "../components/shared/CoinFavItem";
import { database } from "../src/firebase/firebaseConfig";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

const MyCoins = () => {
  const [favs, setFavs] = useState([]);
  const [search, setSearch] = useState("");

  let coins = [];

  const getFavs = async () => {
    const colRef = collection(database, "favs");
    onSnapshot(colRef, (snapshots) => {
      coins = [];
      snapshots.docs.forEach((doc) => {
        coins.push({ ...doc.data(), idDoc: doc.id });
      });
      setFavs(coins);
    });
  };

  useEffect(() => {
    getFavs();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414" />
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          autoCapitalize={"none"}
          placeholder="Search a coin"
          placeholderTextColor="#858585"
          onChangeText={(text) => {
            setSearch(text);
          }}
        />
      </View>
      <FlatList
        style={styles.list}
        data={favs.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return <CoinFavItem coin={favs[index]} />;
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  input: {
    color: "#fff",
    outlineStyle: "none",
    borderBottomColor: "#4657CE",
    borderBottomWidth: 1,
    width: "60%",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 20,
    marginHorizontal: 'auto'
  },
  tittle: {
    color: "#fff",
    marginTop: 10,
    fontSize: 20,
  },
  container: {
    backgroundColor: "rgb(19, 0, 64)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "90%",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  Headercontainer: {
    flexDirection: "row",
    marginBottom: 40,
  },
  headerOne: {
    backgroundColor: "#130040",
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  headerTwo: {
    backgroundColor: "#130040",
    color: "#ABFB5C",
    fontSize: 40,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
});

export default MyCoins;
