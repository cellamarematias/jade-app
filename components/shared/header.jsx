import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Header = (props) => {
  const [bitcoin, setBitcoin] = useState({
    id: "",
    price: "",
    dolar: "",
    image: "",
    price_change_percentage_24h: 0,
  });

  const [ethereum, setEthereum] = useState({
    id: "",
    price: "",
    dolar: "",
    image: "",
    price_change_percentage_24h: 0,
  });

  const [tether, setTether] = useState({
    id: "",
    price: "",
    dolar: "",
    image: "",
    price_change_percentage_24h: 0,
  });

  const bitcoinSet = async () => {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin`);
    const data = await res.json();
    await setBitcoin({
      id: data.name,
      price: data.market_data.current_price.ars,
      dolar: data.market_data.current_price.usd,
      image: data.image.small,
      price_change_percentage_24h: data.price_change_percentage_24h,
    });
  };

  const ethereumSet = async () => {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/ethereum`);
    const data = await res.json();
    await setEthereum({
      id: data.name,
      price: data.market_data.current_price.ars,
      dolar: data.market_data.current_price.usd,
      image: data.image.small,
      price_change_percentage_24h: data.price_change_percentage_24h,
    });
  };

  const tetherSet = async () => {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/tether`);
    const data = await res.json();
    await setTether({
      id: data.name,
      price: data.market_data.current_price.ars,
      dolar: data.market_data.current_price.usd,
      image: data.image.small,
      price_change_percentage_24h: data.price_change_percentage_24h,
    });
  };

  useEffect(() => {
    bitcoinSet();
    ethereumSet();
    tetherSet();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.image} source={{ uri: bitcoin.image }} />
        <Text style={styles.value}> ${bitcoin.dolar}</Text>
      </View>
      <View style={styles.row}>
        <Image style={styles.image} source={{ uri: ethereum.image }} />
        <Text style={styles.value}> ${ethereum.dolar}</Text>
      </View>
      <View style={styles.row}>
        <Image style={styles.image} source={{ uri: tether.image }} />
        <Text style={styles.value}> ${tether.dolar}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 15,
    left: 0,
	display: 'flex',
    flexDirection: "row",
    alignItems: "center",
	justifyContent: 'space-between',
    width: "100%",
    backgroundColor: "#32089A",
    padding: 15,
    paddingStart: 25,
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 10,
    shadowColor: "white",
    shadowOpacity: 0.5,
    width: "100%",
	paddingVertical: 10,
	textAlign: 'center'
  },
  row: {
    flexDirection: "row",
    margin: 2,
    marginEnd: 10,
  },
  coin: {
    textTransform: "uppercase",
    fontSize: 17,
    marginRight: 7,
  },
  value: {
    color: "#CAF99B",
    fontSize: 15,
    marginRight: 7,
  },
  image: {
    width: 25,
    height: 25,
    borderRadius: 4,
	marginRight: 2
  },
  tinyLogo: {
    width: 60,
    height: 60,
  },
  center: {
    justifyContent: "center",
  },
  heading: {
    justifyContent: "center",
    paddingLeft: 8,
    maxWidth: "90%",
    fontWeight: "bold",
  },
});

export default Header;
