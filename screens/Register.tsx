import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { googleLogin } from "../src/firebase/Firebase";
import { FormRegister } from "../components/shared/FormRegister";

const Register = () => {
  const navigation: any = useNavigation();
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
      <FormRegister />
      <TouchableOpacity onPress={googleLogin} style={styles.continueGoogle}>
        <Text style={styles.textButtonContinue}>
          <Text style={styles.GfromGoogle}>G</Text>Continue with Google
        </Text>
      </TouchableOpacity>
      <Text style={styles.conditions}>
        By proceeding, you agree with Terms of Use & Privacy Policy.
      </Text>
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
    marginTop: 15,
    marginBottom: 15,
    color: "#FFF",
    fontFamily: "Roboto",
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    marginHorizontal: "auto",
  },
  GfromGoogle: {
    fontSize: 50,
    fontWeight: "900",
    paddingRight: 8,
  },
  continueGoogle: {
    width: "85%",
    paddingVertical: 1,
    marginHorizontal: "auto",
    backgroundColor: "transparent",
    border: 20,
    borderColor: "#fff",
    borderRadius: 5,
    textAlign: "center",
  },
  forgotPassword: {
    width: "80%",
    marginHorizontal: "auto",
    textAlign: "right",
    color: "#fff",
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
    marginTop: 18,
    backgroundColor: "#130040",
    paddingVertical: 10,
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
