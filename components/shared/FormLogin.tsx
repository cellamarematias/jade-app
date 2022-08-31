import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { emailAndPasswordLogin } from "../../src/firebase/Firebase";

export const FormLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [viewPassowrd, setViewPassowrd] = useState<boolean>(true);

  return (
    <View style={styles.container}>
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
      <TouchableOpacity
        onPress={() => emailAndPasswordLogin(email, password)}
        style={styles.buttonSend}
      >
        <Text style={styles.textSendButton}>LOGIN</Text>
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
    width: "85%",
    backgroundColor: "#130040",
    marginHorizontal: "auto",
    height: 'auto'
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
    paddingVertical: 12,
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
});
