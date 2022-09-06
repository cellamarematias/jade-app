import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NAME_REGEX, EMAIL_REGEX } from "../src/typesAndConsts";
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { app, database } from "../src/firebase/Firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Settings = () => {
  const [firstnameForm, setFirstnameForm] = useState<string>("");
  const [lastnameForm, setLastnameForm] = useState<string>("");
  const [emailForm, setEmailForm] = useState<string>("");
  const [idDoc, setIdDoc] = useState<string>("");
  const [firstnameError, setFirstnameError] = useState<boolean>(true);
  const [lastnameError, setLastnameError] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<boolean>(true);
  const [emailExistence, setEmailExistence] = useState<boolean>(false);
  const [emailLocalstorage, setEmailLocalStorage] = useState<string>("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    // uso el localstorage y traigo los datos del documento en cuestion
    const userLogged = await AsyncStorage.getItem("user");
    const userConvert = JSON.parse(userLogged);
    setEmailLocalStorage(userConvert.email);
    // obtengo el id del documento a cambiar
    const querySnapshot = await getDocs(collection(database, "users"));
    const documentRef = await querySnapshot.docs.map((doc) => ({
      firstname: doc.data().firstname,
      lastname: doc.data().lastname,
      uid: doc.data().uid,
      email: doc.data().email,
      idDoc: doc.id,
    }));
    const response = documentRef.filter(
      (doc) => doc.email === userConvert.email
    );
    setIdDoc(response[0].idDoc);
    setFirstnameForm(response[0].firstname);
    setLastnameForm(response[0].lastname);
    setEmailForm(response[0].email);
  };

  const onSubmit = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, "users"));
      const usersDatabase = await querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        email: doc.data().email,
        firstname: doc.data().firstname,
        lastname: doc.data().lastname,
        uid: doc.data().uid,
      }));
      console.log("usersDatabase", usersDatabase);
      const findEmail = usersDatabase.filter(
        (user) => user.email === emailForm
      );
      if (findEmail.length !== 0 && findEmail[0].email !== emailLocalstorage) {
        setEmailExistence(true);
      } else {
        setEmailExistence(false);
        setFirstnameError(NAME_REGEX.test(firstnameForm));
        setLastnameError(NAME_REGEX.test(lastnameForm));
        setEmailError(EMAIL_REGEX.test(emailForm));
      }
      if (firstnameError && lastnameError && emailError && !emailExistence) {
        try {
          const docRef = doc(database, "users", idDoc);
          updateDoc(docRef, {
            firstname: firstnameForm,
            lastname: lastnameForm,
            email: emailForm,
          });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Settings</Text>
      <Text>Avatar</Text>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: "https://static.diariofemenino.com/uploads/belleza/82981-CARA.jpg",
          }}
        />
        <TouchableOpacity>
          <Text>Edit Avatar</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View>
          <Text style={styles.inputsLabel}>First name</Text>
          <TextInput
            style={styles.inputs}
            value={firstnameForm}
            placeholder="first name"
            onChangeText={(text) => setFirstnameForm(text)}
          />
          {firstnameError ? null : (
            <Text style={styles.msgError}>* invalid first name</Text>
          )}
        </View>
        <View>
          <Text style={styles.inputsLabel}>Last Name</Text>
          <TextInput
            style={styles.inputs}
            value={lastnameForm}
            placeholder="last name"
            onChangeText={(text) => setLastnameForm(text)}
          />
          {lastnameError ? null : (
            <Text style={styles.msgError}>* invalid last name</Text>
          )}
        </View>
        <View>
          <Text style={styles.inputsLabel}>Email</Text>
          <TextInput
            style={[styles.inputs, emailExistence && styles.errorInput]}
            value={emailForm}
            placeholder="email"
            onChangeText={(text) => setEmailForm(text)}
          />
          {emailExistence ? (
            <Text style={styles.msgError}>* Email already in use</Text>
          ) : null}
          {emailError ? null : (
            <Text style={styles.msgError}>* invalid email</Text>
          )}
        </View>
        <View>
          <Text>Wallet</Text>
          <TouchableOpacity>
            <Text>Connect</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonSend} onPress={onSubmit}>
          <Text style={styles.textSendButton}>Save Changes</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Password</Text>
        <Text>Set a unique password to protect your personal account.</Text>
        <TouchableOpacity>
          <Text>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    color: "red",
    marginTop: 35,
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 2,
  },
  msgError: {
    paddingTop: 4,
    height: 8,
    color: "red",
  },
  msgErrorPassword: {
    height: 8,
    color: "#fff",
    marginTop: -33,
  },
  boxPassword: {
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 40,
    backgroundColor: "#6053DD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    flex: 1,
    backgroundColor: "#130040",
    marginHorizontal: "auto",
    height: "auto",
  },
  inputsBox: {
    marginTop: 2,
    width: "85%",
    marginHorizontal: "auto",
  },
  inputsLabel: {
    marginTop: 17,
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 30,
  },
  inputs: {
    backgroundColor: "#6053DD",
    color: "#fff",
    width: "100%",
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
    fontFamily: "Roboto",
    fontSize: 20,
    letterSpacing: 2,
    paddingVertical: 12,
  },
  icon: {
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    textAlign: "center",
    width: 80,
    backgroundColor: "#CAF99B",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  iconPassword: {
    color: "#FFF",
  },
  iconPasswordText: {
    fontFamily: "Roboto",
    fontSize: 23,
    color: "#130040",
    letterSpacing: 1.3,
    fontWeight: "500",
  },
  buttonSend: {
    textAlign: "center",
    backgroundColor: "#CAF99B",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 7,
    width: "100%",
    height: 50,
    marginHorizontal: "auto",
  },
  textSendButton: {
    letterSpacing: 2,
    fontWeight: "500",
    fontSize: 16,
    color: "black",
    paddingVertical: "auto",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default Settings;
