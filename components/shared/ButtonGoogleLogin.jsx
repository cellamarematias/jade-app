import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { app, database } from "../../src/firebase/Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";

// interface UserLogged {
//   firstname: string;
//   lastname: string;
//   email: string;
//   uid: string;
// }

export function ButtonGoogleLogin() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (UserCredentials) => {
        const completeNameUser = UserCredentials.user.displayName.split(" ");
        const userLogged = {
          firstname: completeNameUser[0],
          lastname: completeNameUser[1],
          email: UserCredentials.user.email,
          uid: UserCredentials.user.uid,
        };
        console.log("userLogged", userLogged);
        // lo guardo en logalstorage
        const userToJSON = JSON.stringify(userLogged);
        AsyncStorage.setItem("user", userToJSON);
        // traigo los usuarios de firestore
        const querySnapshot = await getDocs(collection(database, "users"));
        const response = await querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        // hago checkeos si esta registrado en Firestore o no
        if (!(userLogged.email === undefined)) {
          let isRegistered = false;
          for (let i = 0; i < response.length; i++) {
            if (response[i].email === userLogged.email) {
              isRegistered = true;
            }
          }
          if (!isRegistered) {
            addDoc(collection(database, "users"), userLogged);
          }
        }
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
