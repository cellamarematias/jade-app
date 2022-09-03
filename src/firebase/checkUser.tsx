import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUser = () => {
  const [user, setUser] = useState({});
  const checkLogguin = async () => {
    try {
      const getData = await AsyncStorage.getItem("token");
      const parseDate = JSON.parse(getData);
      return parseDate !== "" && parseDate !== null;
    } catch (e) {
      return false;
    }
  };
  const getUser = () => {
    // ver como consigo los datos del usuario
  };

  return { user, checkLogguin };
};
export default useUser;
