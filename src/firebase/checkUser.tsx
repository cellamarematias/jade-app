import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const checkUser = async () => {
  const [response, setresponse] = useState(false);
  try {
    const getData = await AsyncStorage.getItem("token");
    const parseDate = JSON.parse(getData);
    setresponse(parseDate !== "" && parseDate !== null);
  } catch (e) {
    setresponse(false);
  }
	return response
};
export default checkUser