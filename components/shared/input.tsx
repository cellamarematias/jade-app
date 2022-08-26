import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
// label: da el texto al label
// placeholder: da el texto al placeholder
// typePassword: es un booleano q indica si el input es de tipo password o de tipo texto

type Props = {
  label?: string;
  placeholder?: string;
  typePassword?: boolean;
};

export const InputPrimary: React.FC<Props> = ({
  placeholder,
  label,
  typePassword,
}) => {
  const [viewPassowrd, setViewPassowrd] = useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {typePassword ? (
        <View style={styles.boxPassword}>
          <TextInput
            secureTextEntry={viewPassowrd}
            placeholder={placeholder}
            style={(styles.inputPrimary, styles.inputPassword)}
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
      ) : (
        <TextInput placeholder={placeholder} style={styles.inputPrimary} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginHorizontal: "auto",
    marginVertical: "5%",
  },
  label: {
    marginBottom: 10,
    letterSpacing: 2,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#FFF",
  },
  inputPrimary: {
    color: "#FFF",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    backgroundColor: "#6053DD",
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
  inputPassword: {
    color: "#FFF",
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 5,
  },
  icon: {
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    textAlign: "center",
    width: 70,
    backgroundColor: "#CAF99B",
    padding: 10,
  },
  iconPassword: {
    color: "#FFF",
  },
  iconPasswordText: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#130040",
  },
});
