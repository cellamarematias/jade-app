import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { database } from "../../src/firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const CoinFavItem = ({ coin }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [coinPrice, setCoinPrice] = useState({
    id: "",
    price: "",
    dolar: "",
    image: "",
    price_change_percentage_24h: 0,
  });


  const deleteCoin = async (id: string) => {
    const docRef = doc(database, "favs", id);
    deleteDoc(docRef);
    setModalDelete(!modalDelete);
  };

  const seeMarket = async (coin) => {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`);
    const data = await res.json();
    setCoinPrice({
      id: data.name,
      price: data.market_data.current_price.ars,
      dolar: data.market_data.current_price.usd,
      image: data.image.small,
      price_change_percentage_24h: data.price_change_percentage_24h,
    });
    setModalVisible(true);
  };

  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{coinPrice.id}</Text>
              <Image style={styles.image} source={{ uri: coinPrice.image }} />
              <Text
                style={styles.modalTextNormal}
              >{`ARS $ ${coinPrice.price}`}</Text>
              <Text
                style={styles.modalTextNormal}
              >{`U$D ${coinPrice.dolar}`}</Text>
              <Text
                style={[
                  styles.pricePercentage,
                  coin.price_change_percentage_24h > 0
                    ? styles.priceUp
                    : styles.priceDown,
                ]}
              >
                {coin.price_change_percentage_24h > 0 ? (
                  <AntDesign name="caretup" size={13} color="#70f752" />
                ) : (
                  <AntDesign name="caretdown" size={13} color="#f72819" />
                )}
                {`Change 24h: ${coin.price_change_percentage_24h}`}
              </Text>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  styles.buttonCloseModalPrice,
                ]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* MODAL Delete */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalDelete}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalDelete(!modalDelete);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalViewDelete}>
              <Text
                style={styles.textToDelete}
              >{`You want to remove ${coin.name} ?`}</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonYes]}
                  onPress={() => {
                    deleteCoin(coin.idDoc);
                  }}
                >
                  <Text style={styles.textStyle}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalDelete(!modalDelete)}
                >
                  <Text style={styles.textStyle}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <TouchableOpacity style={styles.containerItem}>
        <View style={styles.coinName}>
          <Image style={styles.image} source={{ uri: coin.image }} />
          <View style={styles.containerNames}>
            <Text style={styles.text}>{coin.name}</Text>
            <Text style={styles.symbol}>{coin.symbol}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => seeMarket(coin.id)}>
            <Text style={styles.text}>
              <Ionicons name="pricetag-outline" size={20} color="#CAF99B" />
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => setModalDelete(true)}>
            <Text style={styles.text}>
              {<AntDesign name="delete" size={20} color="tomato" />}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: "#ffffff",
  },
  containerItem: {
    backgroundColor: "rgb(19, 0, 64)",
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerNames: {
    marginLeft: 10,
  },
  coinName: {
    width: 170,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    color: "#ffffff",
  },
  textPrice: {
    color: "#fff",
    textAlign: "right",
  },
  image: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  symbol: {
    color: "#6053DD",
    textTransform: "uppercase",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "500",
  },
  pricePercentage: {
    textAlign: "right",
  },
  priceUp: {
    color: "#70f752",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1.2,
  },
  priceDown: {
    color: "#f72819",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1.2,
  },
  centeredView: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "70%",
    height: 350,
    backgroundColor: "#6053DD",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 5,
  },
  modalViewDelete: {
    width: "75%",
    height: 250,
    backgroundColor: "#6053DD",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 5,
  },
  modalButtons: {
    width: "85%",
    height: 100,
    flexDirection: "column",
    marginHorizontal: "auto",
    paddingHorizontal: "auto",
    gap: 6,
  },
  button: {
    width: "100%",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginHorizontal: "auto",
    paddingHorizontal: "auto",
  },
  buttonYes: {
    margin: 10,
    backgroundColor: "#4baf73",
  },
  buttonClose: {
    margin: 10,
    backgroundColor: "#db2929",
    marginBottom: 20,
  },
  buttonCloseModalPrice: {
    width: "90%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginTop: 8,
    marginBottom: 4,
    textAlign: "center",
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 26,
  },
  modalTextNormal: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 16,
    marginVertical: 4,
  },
  textToDelete: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 20,
    marginVertical: 4,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 300,
    height: 300,
    backgroundColor: "red",
    marginBottom: 30,
  },
});

export default CoinFavItem;
