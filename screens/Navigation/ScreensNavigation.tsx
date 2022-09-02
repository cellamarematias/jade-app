import React, { useState, useEffect } from "react";
import LoggedNavigation from "./LoggedNavigation";
import NotLoggedNavigation from "./NotLoggedNavigation";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../src/firebase/Firebase";
import "firebase/compat/auth";

export function ScreensNavigation() {
  const [user, setuser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((Credentials) => {
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
