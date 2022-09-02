import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  NAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from "../../src/typesAndConsts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { database, auth } from "../../src/firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { useForm, Controller } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "firebase/compat/auth";

// ver los useState con boolean

export const FormRegister = () => {
  const [viewPassowrd, setViewPassowrd] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (resp) => {
        const userLogged = {
          firstname: data.name,
          lastname: data.lastname,
          email: data.email,
          uid: resp?.user?.uid,
          password: data.password,
        };
        const userToJSON = JSON.stringify(userLogged);
        AsyncStorage.setItem("user", userToJSON);
        await addDoc(collection(database, "users"), userLogged);
      })
      .catch((err) => {
        AsyncStorage.setItem("user", "");
      });
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.inputsLabel}>Name</Text>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "Name is required *",
            },
            pattern: {
              value: NAME_REGEX,
              message: "Name must have only letters*",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.inputs, errors.name && styles.errorInput]}
              onChangeText={onChange}
              value={value}
              placeholder="Name"
            />
          )}
          name="name"
        />
        <Text style={styles.msgError}>
          {errors.name && errors.name.message}
        </Text>
      </View>
      <View>
        <Text style={styles.inputsLabel}>Lastname</Text>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "Lastname is required *",
            },
            pattern: {
              value: NAME_REGEX,
              message: "Last name must have only letters *",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.inputs, errors.lastname && styles.errorInput]}
              onChangeText={onChange}
              value={value}
              placeholder="Last name"
            />
          )}
          name="lastname"
        />
        <Text style={styles.msgError}>
          {errors.lastname && errors.lastname.message}
        </Text>
      </View>
      <View>
        <Text style={styles.inputsLabel}>Email</Text>
        <Controller
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
              placeholder="Email"
            />
          )}
          name="email"
        />
        <Text style={styles.msgError}>
          {errors.email && errors.email.message}
        </Text>
        <Text style={styles.msgError}>
          {isEmailAvailable ? "" : "Email already in use"}
        </Text>
      </View>
      <View>
        <Text style={styles.inputsLabel}>Password</Text>
        <View style={styles.boxPassword}>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Password is required *",
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters *",
              },
              pattern: {
                value: PASSWORD_REGEX,
                message:
                  "Password must have at least 1 number and 1 special character *",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.inputs, errors.password && styles.errorInput]}
                onChangeText={onChange}
                value={value}
                secureTextEntry={viewPassowrd}
                placeholder="Password"
              />
            )}
            name="password"
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setViewPassowrd(!viewPassowrd)}
          >
            <Text style={styles.iconPasswordText}>
              {viewPassowrd ? "Show" : "Hide"}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.msgErrorPassword}>
          {errors.password && errors.password.message}
        </Text>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.buttonSend}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.textSendButton}>REGISTER</Text>
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
});
