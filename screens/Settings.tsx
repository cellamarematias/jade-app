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

const Settings = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const getUser = async () => {
    const userLogged = await AsyncStorage.getItem("user");
    const userConvert = JSON.parse(userLogged);
    setFirstName(userConvert.firstname);
    setLastName(userConvert.lastname);
    setEmail(userConvert.email);
  };
  useEffect(() => {
    getUser();
  }, []);

  const saveChanges = () => {};
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
          <Text>First Name</Text>
          <TextInput
            onChangeText={(text) => setFirstName(text)}
            placeholder={firstName}
            value={firstName}
          />
        </View>
        <View>
          <Text>Last Name</Text>
          <TextInput
            onChangeText={(text) => setLastName(text)}
            placeholder={lastName}
            value={lastName}
          />
        </View>
        <View>
          <Text>Email</Text>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            placeholder={email}
            value={email}
          />
        </View>
        <View>
          <Text>Wallet</Text>
          <TouchableOpacity>
            <Text>Connect</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => saveChanges()}>
          <Text>Save</Text>
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default Settings;
