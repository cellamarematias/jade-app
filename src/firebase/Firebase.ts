import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBF8gisRvhq_52RsFAirZ42mJKbFu-AKSM",
  authDomain: "jade-10af5.firebaseapp.com",
  projectId: "jade-10af5",
  storageBucket: "jade-10af5.appspot.com",
  messagingSenderId: "415628306391",
  appId: "1:415628306391:web:6ed51cb0d319e320964d92",
};
export const app: any = initializeApp(firebaseConfig);

// login with email and password
export function emailAndPasswordLogin(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials: any) => {
      console.log(userCredentials);
      try {
        const userToJSON: string = JSON.stringify(
          userCredentials._tokenResponse.idToken
        );
        AsyncStorage.setItem("token", userToJSON);
        console.log("bien logged con email");
      } catch (error) {
        AsyncStorage.setItem("token", "");
      }
    })
    .catch((err) => {
      AsyncStorage.setItem("token", "");
    });
}

// login with google
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export function googleLogin() {
  signInWithPopup(auth, provider)
    .then((UserCredentials: any) => {
      console.log("result", UserCredentials._tokenResponse.idToken);
      const userToJSON: string = JSON.stringify(
        UserCredentials._tokenResponse.idToken
      );
      AsyncStorage.setItem("token", userToJSON);
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
