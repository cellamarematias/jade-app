import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NAME_REGEX, EMAIL_REGEX } from "../src/typesAndConsts";
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { database } from "../src/firebase/Firebase";
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
  const [isFetching, setIsFetching] = useState(true)

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
    setIdDoc(response[0]?.idDoc);
    setFirstnameForm(response[0]?.firstname);
    setLastnameForm(response[0]?.lastname);
    setEmailForm(response[0]?.email);
    setIsFetching(false)
  };

  const onSubmit = async () => {
    setIsFetching(true)
    try {
      const querySnapshot = await getDocs(collection(database, "users"));
      const usersDatabase = await querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        email: doc.data().email,
        firstname: doc.data().firstname,
        lastname: doc.data().lastname,
        uid: doc.data().uid,
      }));
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
      }
    } catch (error) {
      console.log(error);
    }
    setIsFetching(false)
  };

  return (
    <ScrollView>
      {isFetching ? (
        <ActivityIndicator
          style={styles.loader}
          animating={true}
          size="large"
          color="#CAF99B"
        />
      ) : null}
      <View style={styles.body}>
        <Text style={styles.title}>Settings</Text>
        <View>
          <View style={styles.boxInput}>
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
          <View style={styles.boxInput}>
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
          <View style={styles.boxInput}>
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
          <Text style={styles.inputsLabel}>Wallet : </Text>
          <View style={styles.boxPassword}>
            <TouchableOpacity>
              <Text style={styles.inputs}>Connect</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttonSend} onPress={onSubmit}>
            <Text style={styles.textSendButton}>Save Changes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.textFooter}>Password</Text>
          <Text style={styles.textSecondaryFooter}>
            Set a unique password to protect your personal account.
          </Text>
          <TouchableOpacity style={[styles.buttonSend, styles.changePassword]}>
            <Text style={styles.textSendButton}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

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
  body: {
    backgroundColor: "#130040",
    flex: 1,
    paddingHorizontal: "10%",
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 40,
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
  },
  boxInput: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 3,
  },
  footer: {
    marginVertical: "5%",
    borderTopColor: "#6053DD",
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderWidth: 2,
    paddingTop: 3,
  },
  textFooter: {
    marginTop: 17,
    color: "#fff",
    fontFamily: "Roboto",
    fontSize: 24,
    marginBottom: 3,
  },
  textSecondaryFooter: {
    marginTop: 4,
    color: "#9c9c9c",
    fontFamily: "Roboto",
    fontSize: 18,
    marginBottom: 3,
  },
  changePassword: {
    marginVertical: 3,
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
    marginBottom: 3,
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
  buttonSend: {
    textAlign: "center",
    backgroundColor: "#CAF99B",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    height: 40,
    marginHorizontal: "auto",
    fontFamily: "Roboto",
  },
  textSendButton: {
    height: "100%",
    letterSpacing: 2,
    fontWeight: "500",
    fontSize: 16,
    color: "black",
    marginVertical: 5,
  },
});

export default Settings;
