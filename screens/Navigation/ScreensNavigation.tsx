import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoggedNavigation from "./LoggedNavigation";
import NotLoggedNavigation from "./NotLoggedNavigation";
function ScreensNavigation() {
  const [auth, setAuth] = useState("");
  const checkUser = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      const resp = JSON.parse(value);
      setAuth(resp);
      console.log(resp);
    } catch (e) {
      // error reading value
    }
  };
  checkUser();

  return auth === null || auth === "" ? (
    <NotLoggedNavigation />
  ) : (
    <LoggedNavigation />
  );
}

export default ScreensNavigation;
