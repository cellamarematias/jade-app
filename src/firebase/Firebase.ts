import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAuth,
  signInWithEmailAndPassword,
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
export function emailAndPasswordLogin(
  email: string,
  password: string,
  isFetching: any
): any {
  isFetching(true);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials: any) => {
      const userToJSON: string = JSON.stringify(
        userCredentials._tokenResponse.idToken
      );
      AsyncStorage.setItem("token", userToJSON);
      isFetching(false);
    })
    .catch((err) => {
      AsyncStorage.setItem("token", "");
      isFetching(false);
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
