import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUser = ({ name, password }) => {
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
// onAuthStateChanged para ver si esta logeado o no
// firebase.auth
// porcion de codigo
// auth.onAuthStateChanged(user() => {
//   if(user){
//     // esta logeado
//   } else {
//     // no esta logueadop
//   }
// })
// login google
// onclick(() => {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   auth
//     .signInWithPopup(provider)
//     .then((result) => {
//       console.log("result ok", result);
//     })
//     .catch((err) => console.log("err", err));
// });
// login facebook esto y ver video con facebookdevelopers
// onclick(() => {
//   const provider = new firebase.auth.FacebookAuthProvider();
//   auth
//     .signInWithPopup(provider)
//     .then((result) => {
//       console.log("result ok", result);
//     })
//     .catch((err) => console.log("err", err));
// });

