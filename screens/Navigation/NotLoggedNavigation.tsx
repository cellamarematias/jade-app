import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
// screens
import Login from "../Login";
import Register from "../Register";

const { Navigator, Screen }: any = createNativeStackNavigator();

function MyStack() {
  return (
    <Navigator initialRouteName="Login">
      <Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
}
function NotLoggedNavigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
export default NotLoggedNavigation;
