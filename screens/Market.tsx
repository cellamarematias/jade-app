import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TextInput, StatusBar } from "react-native";
import CoinItem from "../components/shared/CoinItem";
import HeaderList from "../components/shared/HeaderList";

const Market = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await res.json();
    setCoins(data);
  };

  useEffect(() => {
    loadData();
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
        ListHeaderComponent={() => <HeaderList />}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await loadData();
          setRefreshing(false);
        }}
        style={styles.list}
        data={coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        )}
        renderItem={({ item, index }) => {
          return <CoinItem coin={coins[index]} />;
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
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
    width: "100%",
    paddingHorizontal: "3%",
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

export default Market;
