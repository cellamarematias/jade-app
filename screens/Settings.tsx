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
import { useForm, Controller } from "react-hook-form";
import { NAME_REGEX, EMAIL_REGEX } from "../src/typesAndConsts";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../src/firebase/Firebase";

const Settings = () => {
  const [firstNameStorage, setFirstNameStorage] = useState("");
  const [lastNameStorage, setLastNameStorage] = useState("");
  const [emailStorage, setEmailStorage] = useState("");
  const [uidStorage, setUidStorage] = useState("");
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstname: firstNameStorage,
      lastname: lastNameStorage,
      email: emailStorage,
    },
  });

  const getUser = async () => {
    const userLogged = await AsyncStorage.getItem("user");
    const userConvert = JSON.parse(userLogged);
    setFirstNameStorage(userConvert.firstname);
    setLastNameStorage(userConvert.lastname);
    setEmailStorage(userConvert.email);
    setUidStorage(userConvert.uid);
    // tampoco funciona
    // const settingdata = {
    //   firstname: firstNameStorage,
    //   lastname: lastNameStorage,
    //   email: emailStorage,
    // };
    // reset(settingdata);
  };
  useEffect(() => {
    getUser();
  }, []);

  const onSubmit = (data) => {
    try {
      console.log("uidStorage", uidStorage);
      const docRef = doc(database, "/users", uidStorage);
      updateDoc(docRef, {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      });
      // lo hace bien a lo de arriba pero no actualiza nada
      console.log("llegamos al final");
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
          <TextInput placeholder="first name" />
          {/* <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Name is required *",
              },
              pattern: {
                value: NAME_REGEX,
                message: "First Name must have only letters*",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.inputs, errors.firstname && styles.errorInput]}
                onChangeText={onChange}
                value={value}
                // placeholder={firstNameStorage}
              />
            )}
            name="firstname"
          />
          <Text style={styles.msgError}>
            {errors.firstname && errors.firstname.message}
          </Text> */}
        </View>
        <View>
          <Text style={styles.inputsLabel}>Last Name</Text>
          <TextInput placeholder="last name" />
          {/* <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Last Name is required *",
              },
              pattern: {
                value: NAME_REGEX,
                message: "Last Name must have only letters*",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.inputs, errors.lastname && styles.errorInput]}
                onChangeText={onChange}
                value={value}
                placeholder={lastNameStorage}
              />
            )}
            name="lastname"
          />
          <Text style={styles.msgError}>
            {errors.lastname && errors.lastname.message}
          </Text> */}
        </View>
        <View>
          <Text style={styles.inputsLabel}>Email</Text>
          <TextInput placeholder="email" />
          {/* <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Email is required *",
              },
              pattern: {
                value: EMAIL_REGEX,
                message: "Please enter a valid email *",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.inputs, errors.email && styles.errorInput]}
                onChangeText={onChange}
                value={value}
                placeholder={emailStorage}
              />
            )}
            name="email"
          />
          <Text style={styles.msgError}>
            {errors.email && errors.email.message}
          </Text> */}
          <Text style={styles.msgError}>
            {isEmailAvailable ? "" : "Email already in use"}
          </Text>
        </View>
        <View>
          <Text>Wallet</Text>
          <TouchableOpacity>
            <Text>Connect</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.buttonSend}
          onPress={handleSubmit(onSubmit)}
        >
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
    color: "#fff",
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
