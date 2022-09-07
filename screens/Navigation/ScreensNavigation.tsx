import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoggedNavigation from "./LoggedNavigation";
import NotLoggedNavigation from "./NotLoggedNavigation";
import { StatusBar } from "expo-status-bar";

function ScreensNavigation() {
  const [auth, setAuth] = useState("");
  const checkUser = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      console.log(value)
      const resp = JSON.parse(value);
      setAuth(resp);
      //console.log(resp);
    } catch (e) {
      // error reading value
    }
  };
  checkUser();

  return auth === null || auth === "" ? (
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

export default ScreensNavigation;
