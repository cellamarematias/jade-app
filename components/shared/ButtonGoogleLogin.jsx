import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { app } from "../../src/firebase/Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export function ButtonGoogleLogin() {
  const navigation = useNavigation();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((UserCredentials) => {
        const userToJSON = JSON.stringify(
          UserCredentials._tokenResponse.idToken
        );
        AsyncStorage.setItem("token", userToJSON);
        navigation.navigate("Home");
				changeAuth
				console.log(isAuth);
      })
      .catch((_err) => {
        AsyncStorage.setItem("token", "");
      });
  };

  return (
    <TouchableOpacity onPress={googleLogin} style={styles.continueGoogle}>
      <Text style={styles.textButtonContinue}>
        <Text style={styles.GfromGoogle}>G</Text>Continue with Google
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#130040",
  },
  GfromGoogle: {
    fontSize: 50,
    fontWeight: "900",
    paddingRight: 8,
  },
  textSendButton: {
    letterSpacing: 2,
    fontWeight: "500",
    fontSize: 16,
    color: "black",
    paddingVertical: "auto",
  },
  forgotPassword: {
    width: "85%",
    marginHorizontal: "auto",
    textAlign: "right",
    color: "#fff",
    fontSize: 16,
    marginVertical: 15,
  },
  optionalLoginText: {
    letterSpacing: 4,
    color: "#fff",
    marginVertical: 15,
    fontFamily: "Roboto",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "200",
  },
  continueGoogle: {
    width: "85%",
    paddingVertical: 10,
    marginHorizontal: "auto",
    backgroundColor: "transparent",
    border: 20,
    borderColor: "#fff",
    borderRadius: 5,
    textAlign: "center",
  },
  textButtonContinue: {
    color: "#FFF",
    border: 2,
    borderRadius: 5,
    letterSpacing: 2,
    fontWeight: "normal",
    fontFamily: "Roboto",
    fontSize: 25,
  },
  textCreateAccount: {
    marginTop: "10%",
    color: "#FFF",
    fontFamily: "Roboto",
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
  },
  createAccount: {
    marginTop: 10,
    color: "#FFF",
    fontFamily: "Roboto",
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    borderBottomColor: "#CAF99B",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderWidth: 3,
  },
  boxCreateAccount: {
    width: "42%",
    marginHorizontal: "auto",
  },
  boxTittles: {
    marginTop: 18,
    backgroundColor: "#130040",
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textTittle: {
    fontFamily: "Roboto",
    fontSize: 40,
    color: "#fff",
  },
  borderTittle: {
    fontFamily: "Roboto",
    fontSize: 40,
  },
  borderBot: {
    width: "60%",
    marginHorizontal: "auto",
    marginTop: 3,
    height: 3,
    backgroundColor: "#CAF99B",
  },
});
