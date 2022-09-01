import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBF8gisRvhq_52RsFAirZ42mJKbFu-AKSM",
  authDomain: "jade-10af5.firebaseapp.com",
  projectId: "jade-10af5",
  storageBucket: "jade-10af5.appspot.com",
  messagingSenderId: "415628306391",
  appId: "1:415628306391:web:6ed51cb0d319e320964d92",
};
export const app: any = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);

// login with email and password
export function emailAndPasswordLogin(email: string, password: string): any {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials: any) => {
      console.log(userCredentials);
      const userToJSON: string = JSON.stringify(
        userCredentials._tokenResponse.idToken
      );
      AsyncStorage.setItem("token", userToJSON);
      const navigation: any = useNavigation();
      navigation.navigate("Home");
    })
    .catch((err) => {
      AsyncStorage.setItem("token", "");
    });
}
// login with google
export function googleLogin() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((UserCredentials: any) => {
      console.log("result", UserCredentials._tokenResponse.idToken);
      const userToJSON: string = JSON.stringify(
        UserCredentials._tokenResponse.idToken
      );
      AsyncStorage.setItem("token", userToJSON);
      // changeAuth();
    })
    .catch((_err) => {
      AsyncStorage.setItem("token", "");
    });
}
// create user
export function createUser(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
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
}

export const database = getFirestore();
