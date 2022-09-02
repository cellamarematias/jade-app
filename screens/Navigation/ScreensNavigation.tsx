import React, { useState, useEffect } from "react";
import LoggedNavigation from "./LoggedNavigation";
import NotLoggedNavigation from "./NotLoggedNavigation";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../src/firebase/Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { database, app } from "../../src/firebase/Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import "firebase/compat/auth";

interface UserLogged {
  firstname: string;
  lastname: string;
  email: string;
  uid: string;
}

export function ScreensNavigation() {
  const [user, setuser] = useState(null);
  const [dataUserLogged, setDataUserLogged] = useState({});
  const [dataFirestore, setDataFirestore] = useState([]);

  const getDataFirestore = async () => {};

  useEffect(() => {
    auth.onAuthStateChanged(async (Credentials) => {
      const completeNameUser = Credentials?.displayName?.split(" ");
      const userLogged: UserLogged = {
        firstname: completeNameUser === undefined ? null : completeNameUser[0],
        lastname: completeNameUser === undefined ? null : completeNameUser[1],
        email: Credentials?.email,
        uid: Credentials?.uid,
      };
      const querySnapshot = await getDocs(collection(database, "users"));
      const response = await querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      if (!(userLogged.email === undefined)) {
        setTimeout(() => {
          let isRegistered: boolean = false;
          for (let i = 0; i < response.length; i++) {
            if (response[i].email === userLogged.email) {
              isRegistered = true;
            }
          }
          if (!isRegistered) {
            addDoc(collection(database, "users"), userLogged);
          }
        }, 5000);
      }
      setuser(Credentials);
    });
  }, [user]);

  return user === null ? (
    <>
      <StatusBar style="light" />
      <NotLoggedNavigation />
    </>
  ) : (
    <>
      <StatusBar style="light" />
      <LoggedNavigation />
    </>
  );
}
