import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import SelectList from "react-native-dropdown-select-list";

const Conversor = () => {
  const [selected, setSelected] = useState("");
  const [selectedToConvert, setSelectedToConvert] = useState("");
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const dataFetch = await response.json();
    setData(
      dataFetch.map((coin) => {
        // const dataNew = { name: `${coin.name}  ${coin.symbol.toUpperCase()}` };
        const dataNew = { name: coin.name };
        return Object.values(dataNew);
      })
    );
    setAllData(dataFetch);
  };

  const checkValues = async () => {
    const findIdFirstCoin = allData.filter((coin) => coin.name === selected[0]);
    const findIdSecondCoin = allData.filter(
      (coin) => coin.name === selectedToConvert[0]
    );
    const result =
      (quantity * findIdFirstCoin[0].current_price) /
      findIdSecondCoin[0].current_price;
    setResult({ resultCheck: result, symbol: findIdSecondCoin[0].symbol });
  };

  return (
    <View style={styles.body}>
      <Text style={styles.title}>Conversor</Text>
      <View>
        <Text style={styles.text}>Quantity</Text>
        <TextInput
          style={styles.inputs}
          onChangeText={(text) => setQuantity(Number(text))}
          placeholder="1"
        />
        <Text style={styles.text}>From</Text>
        <SelectList
          data={data}
          setSelected={setSelected}
          boxStyles={{ backgroundColor: "#6053DD" }}
          inputStyles={{ fontFamily: "Roboto", fontSize: 20, color: "#fff" }}
          dropdownStyles={{ backgroundColor: "#6053DD" }}
          dropdownTextStyles={{
            fontFamily: "Roboto",
            fontSize: 16,
            color: "#fff",
          }}
        />
        {/* <TouchableOpacity onPress={() => changeSelects()}>
          <Text>Intercambia</Text>
        </TouchableOpacity> */}
        <Text style={styles.text}>To</Text>
        <SelectList
          data={data}
          setSelected={setSelectedToConvert}
          boxStyles={{ backgroundColor: "#6053DD" }}
          inputStyles={{ fontFamily: "Roboto", fontSize: 20, color: "#fff" }}
          dropdownStyles={{ backgroundColor: "#6053DD" }}
        />
        <TouchableOpacity style={styles.buttonSend} onPress={checkValues}>
          <Text style={styles.textSendButton}>CONVERT</Text>
        </TouchableOpacity>
        {result ? (
          <View style={styles.boxResult}>
            <Text style={styles.resultText}>
              {`${result?.symbol?.toUpperCase()} $ ${result.resultCheck}`}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#130040",
    flex: 1,
    paddingHorizontal: "10%",
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 40,
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
  },
  text: {
    marginTop: 17,
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 24,
    marginBottom: 12,
  },
  inputs: {
    backgroundColor: "#6053DD",
    color: "#fff",
    width: "100%",
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
    fontFamily: "Roboto",
    fontSize: 20,
    letterSpacing: 2,
    paddingVertical: 12,
  },
  buttonSend: {
    marginVertical: '10%',
    textAlign: "center",
    backgroundColor: "#CAF99B",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 7,
    width: "100%",
    height: 50,
    marginHorizontal: "auto",
  },
  textSendButton: {
    letterSpacing: 2,
    fontWeight: "500",
    fontSize: 16,
    color: "black",
    paddingVertical: "auto",
  },
  boxResult: {
    borderTopColor: "#6053DD",
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderWidth: 2
  },
  resultText:{
    color: '#fff',
    fontFamily:'Roboto',
    fontSize: 20,
    paddingVertical: '5%',
    textAlign: 'center'
  }
});

export default Conversor;
