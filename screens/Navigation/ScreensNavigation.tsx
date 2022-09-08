import React, { useState, useEffect } from "react";
import LoggedNavigation from "./LoggedNavigation";
import NotLoggedNavigation from "./NotLoggedNavigation";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../src/firebase/Firebase";
import "firebase/compat/auth";
import { ActivityIndicator, StyleSheet } from "react-native";

export function ScreensNavigation() {
  const [user, setuser] = useState(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    setIsFetching(true);
    auth.onAuthStateChanged((Credentials) => {
      setuser(Credentials);
    });
    setIsFetching(false);
  }, [user]);

  return user === null ? (
    <>
      {isFetching ? (
        <ActivityIndicator
          style={styles.loader}
          animating={true}
          size="large"
          color="#CAF99B"
        />
      ) : null}
      <StatusBar style="light" />
      <NotLoggedNavigation />
    </>
  ) : (
    <>
      {isFetching ? (
        <ActivityIndicator
          style={styles.loader}
          animating={true}
          size="large"
          color="#CAF99B"
        />
      ) : null}
      <StatusBar style="light" />
      <LoggedNavigation />
    </>
  );
}

const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
