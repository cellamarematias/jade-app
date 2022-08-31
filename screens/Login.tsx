import React, { useState } from "react";
import { emailAndPasswordLogin, googleLogin } from "../src/firebase/Firebase";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

const Login: React.FC = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [viewPassowrd, setViewPassowrd] = useState<boolean>(true);

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
      <View style={styles.inputsBox}>
        <View>
          <Text style={styles.inputsLabel}>Email</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
          ></TextInput>
        </View>
        <View>
          <Text style={styles.inputsLabel}>Password</Text>
          <View style={styles.boxPassword}>
            <TextInput
              style={styles.inputs}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={viewPassowrd}
              placeholder="Password"
            ></TextInput>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setViewPassowrd(!viewPassowrd)}
            >
              <Text style={styles.iconPasswordText}>
                {viewPassowrd ? "Show" : "Hide"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => emailAndPasswordLogin(email, password)}
        style={styles.buttonSend}
      >
        <Text style={styles.textSendButton}>LOGIN</Text>
      </TouchableOpacity>
      <Text style={styles.forgotPassword}>Forgot your password ?</Text>
      <Text style={styles.optionalLoginText}>OR</Text>
      <TouchableOpacity onPress={googleLogin} style={styles.continueGoogle}>
        <Text style={styles.textButtonContinue}>
          <Text style={styles.GfromGoogle}>G</Text>Continue with Google
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.textCreateAccount}>
          Don't have an account? Create here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boxPassword: {
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 40,
    backgroundColor: "#6053DD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#130040",
  },
  inputsBox: {
    marginTop: 5,
    width: "85%",
    marginHorizontal: "auto",
  },
  inputsLabel: {
    marginTop: 20,
    marginBottom: 10,
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 30,
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
  },
  icon: {
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    textAlign: "center",
    width: 80,
    backgroundColor: "#CAF99B",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  iconPassword: {
    color: "#FFF",
  },
  iconPasswordText: {
    fontFamily: "Roboto",
    fontSize: 23,
    color: "#130040",
    letterSpacing: 1.3,
    fontWeight: "500",
  },
  buttonSend: {
    textAlign: "center",
    backgroundColor: "#CAF99B",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    paddingVertical: 7,
    width: "85%",
    height: 50,
    marginHorizontal: "auto",
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
    marginVertical: 10,
    color: "#fff",
    fontSize: 16,
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
    marginTop: '10%',
    color: "#FFF",
    fontFamily: "Roboto",
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
  },
  boxTittles: {
    marginTop: 30,
    backgroundColor: "#130040",
    paddingVertical: 30,
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
