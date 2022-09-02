import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";

const Settings = () => {
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
          <TextInput placeholder="First Name" />
        </View>
        <View>
          <Text>Last Name</Text>
          <TextInput placeholder="Last Name" />
        </View>
        <View>
          <Text>Email</Text>
          <TextInput placeholder="email" />
        </View>
        <View>
          <Text>Wallet</Text>
          <TouchableOpacity>
            <Text>Connect</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
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
