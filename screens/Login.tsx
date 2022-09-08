import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FormLogin } from "../components/shared/FormLogin";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ButtonGoogleLogin } from "../components/shared/ButtonGoogleLogin";

const Login = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.boxTittles}>
        <View>
          <Text style={styles.textTittle}>Log In</Text>
          <View style={styles.borderBot}></View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.textTittle}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <FormLogin />
      <Text style={styles.forgotPassword}>Forgot your password ?</Text>
      <ButtonGoogleLogin />
      <TouchableOpacity style={styles.boxRegister} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.textCreateAccount}>Don't have an account?</Text>
        <View style={styles.boxCreateAccount}>
          <Text style={styles.createAccount}>Create Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boxRegister: {
    backgroundColor: "#130040",
  },
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
    paddingTop: 10,
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
    paddingVertical: 20,
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

export default Login;
