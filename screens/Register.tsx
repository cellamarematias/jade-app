import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { googleLogin, createUser } from "../src/firebase/Firebase";

const Register = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassowrd, setViewPassowrd] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <View style={styles.boxTittles}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.textTittle}>Log In</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.textTittle}>Sign Up</Text>
          <View style={styles.borderBot}></View>
        </View>
      </View>
      <View style={styles.inputsBox}>
        <Text style={styles.inputsLabel}>Email</Text>
        <TextInput
          style={styles.inputs}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
        />
        <Text style={styles.inputsLabel}>Password</Text>
        <View style={styles.boxPassword}>
          <TextInput
            placeholder="Password"
            style={styles.inputs}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={viewPassowrd}
          />
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
      <TouchableOpacity onPress={() => createUser(email, password)} style={styles.buttonSend}>
        <Text style={styles.textSendButton}>REGISTER</Text>
      </TouchableOpacity>
      <Text style={styles.optionalLoginText}>OR</Text>
      <TouchableOpacity onPress={googleLogin} style={styles.continueGoogle}>
        <Text style={styles.textButtonContinue}>
          <Text style={styles.GfromGoogle}>G</Text>Continue with Google
        </Text>
      </TouchableOpacity>
      <Text style={styles.conditions}>By proceeding, you agree with Terms of Use & Privacy Policy.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#130040",
    flex: 1,
  },
  conditions: {
    width: "85%",
    marginTop: '15%',
    color: "#FFF",
    fontFamily: "Roboto",
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    marginHorizontal: 'auto'
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
  GfromGoogle: {
    fontSize: 50,
    fontWeight: "900",
    paddingRight: 8,
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
  inputsLabel: {
    marginTop: 20,
    marginBottom: 10,
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 30,
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
    marginTop: 35,
    letterSpacing: 4,
    color: "#fff",
    marginVertical: 15,
    fontFamily: "Roboto",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "200",
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
    marginTop: 30,
    backgroundColor: "#130040",
    paddingVertical: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  inputsBox: {
    marginTop: 5,
    width: "85%",
    marginHorizontal: "auto",
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
  iconPasswordText: {
    fontFamily: "Roboto",
    fontSize: 23,
    color: "#130040",
    letterSpacing: 1.3,
    fontWeight: "500",
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

export default Register;
