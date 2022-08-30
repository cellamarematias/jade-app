import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../src/firebase/firebaseConfig";
import Register from "./Register";

const Login = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  // si queremos reloguer, descomentar la linea de abajo y recargar
  // AsyncStorage.setItem("token", "");
  // funcion crear usuario
  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        const user = userCredentials.user;
      })
      .catch((err) => console.log("entra al catch"));
  };
  // funcion login
  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials: any) => {
        try {
          const userToJSON: string = JSON.stringify(
            userCredentials._tokenResponse.idToken
          );
          AsyncStorage.setItem("token", userToJSON);
        } catch (error) {
          AsyncStorage.setItem("token", "");
        }
      })
      .catch((err) => {
        AsyncStorage.setItem("token", "");
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.exit}>
        <Text style={styles.exitText}>X</Text>
      </TouchableOpacity>
      <View style={styles.boxTittles}>
        <View>
          <Text style={styles.textTittle}>Log In</Text>
          <View style={styles.borderBot}></View>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log("haciendo click");
            navigation.navigate({ Register: Register });
          }}
        >
          <Text style={styles.textTittle}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
      ></TextInput>
      <TextInput
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
      ></TextInput>
      <TouchableOpacity onPress={loginUser} style={styles.buttonSend}>
        <Text style={styles.textSendButton}>LOGIN</Text>
      </TouchableOpacity>
      <Text style={styles.forgotPassword}>Forgot your password ?</Text>
      <Text style={styles.optionalLoginText}>OR</Text>
      <TouchableOpacity style={styles.continueGoogle}>
        <Text style={styles.textButtonContinue}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#130040",
  },
  exit: {
    width: "auto",
    display: "flex",
    flexDirection: "row-reverse",
    marginVertical: 5,
  },
  exitText: {
    fontFamily: "Roboto",
    fontSize: 25,
    paddingTop: 3,
    paddingRight: 10,
    color: "#CAF99B",
  },
  buttonSend: {
    textAlign: "center",
    backgroundColor: "#CAF99B",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 7,
    width: "80%",
    marginHorizontal: "auto",
  },
  textSendButton: {
    letterSpacing: 2,
    fontWeight: "500",
    fontSize: 16,
    color: "black",
    paddingVertical: "auto",
  },
  forgotPassword: {
    width: "80%",
    marginHorizontal: "auto",
    textAlign: "right",
    marginVertical: 10,
    color: "#fff",
  },
  optionalLoginText: {
    letterSpacing: 4,
    color: "#fff",
    marginVertical: 15,
    fontFamily: "Roboto",
    fontSize: 30,
    textAlign: "center",
  },
  continueGoogle: {
    width: "80%",
    paddingVertical: 10,
    marginHorizontal: "auto",
    backgroundColor: "transparent",
    border: 2,
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
  boxTittles: {
    backgroundColor: "#130040",
    paddingVertical: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textTittle: {
    fontFamily: "Roboto",
    fontSize: 40,
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

export default Login;
