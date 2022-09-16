import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  collection,
  addDoc,
  doc,
  query,
  where,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { database } from "../../src/firebase/Firebase";
import { AntDesign } from "@expo/vector-icons";

const CoinItem = ({ coin }) => {
  const [fav, setFav] = useState<boolean>(false);
  const handlerFavorites = (coin) => {
    setFav(!fav);
    if (fav) {
      const colRef = collection(database, "favs");
      const q = query(colRef, where("id", "==", coin.id));
      onSnapshot(q, (snapshots) => {
        let idToDelete = "";
        snapshots.docs.forEach((doc) => {
          idToDelete = doc.id;
        });
        const docRef = doc(database, "favs", idToDelete);
        deleteDoc(docRef);
      });
    } else {
      const docRef = collection(database, "favs");
      addDoc(docRef, {
        ath: coin.ath,
        current_price: coin.current_price,
        id: coin.id,
        image: coin.image,
        market_cap: coin.market_cap,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        symbol: coin.symbol,
        total_supply: coin.total_supply,
        total_volume: coin.total_volume,
        name: coin.name,
        isFav: true,
      });
    }
  };

  return (
    <View style={styles.containerItem}>
      <View style={styles.coinName}>
        <Image style={styles.image} source={{ uri: coin.image }} />
        <View style={styles.containerNames}>
          <Text style={styles.text}>{coin.name}</Text>
          <Text style={styles.symbol}>{coin.symbol}</Text>
        </View>
      </View>
      <View style={styles.containerPrices}>
        <Text style={styles.textPrice}>${coin.current_price}</Text>
        <Text
          style={[
            styles.pricePercentage,
            coin.price_change_percentage_24h > 0
              ? styles.priceUp
              : styles.priceDwon,
          ]}
        >
          {coin.price_change_percentage_24h}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.favBox}
        onPress={() => handlerFavorites(coin)}
      >
        {fav ? (
          <AntDesign name="heart" size={24} color="#CAF99B" />
        ) : (
          <AntDesign name="hearto" size={24} color="#CAF99B" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: "rgb(19, 0, 64)",
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerNames: {
    marginLeft: 10,
  },
  coinName: {
    width: 110,
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: "center",
    paddingRight: 20
  },
  text: {
    color: "#ffffff",
  },
  containerPrices: {
    width: 100,
  },
  favBox: {
    width: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textPrice: {
    color: "#fff",
    textAlign: "right",
  },
  image: {
    width: 30,
    height: 30,
  },
  symbol: {
    color: "#6053DD",
    textTransform: "uppercase",
  },
  pricePercentage: {
    textAlign: "right",
  },
  priceUp: {
    color: "#00B5B9",
  },
  priceDwon: {
    color: "#fc4422",
  },
});

export default CoinItem;
