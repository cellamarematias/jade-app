import React, { useState, useEffect } from "react";
import LoggedNavigation from "./LoggedNavigation";
import NotLoggedNavigation from "./NotLoggedNavigation";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../src/firebase/Firebase";

export function ScreensNavigation() {
  const [user, setuser] = useState({});
  useEffect(() => {
    auth.onAuthStateChanged((response) => {
      setuser(response);
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
