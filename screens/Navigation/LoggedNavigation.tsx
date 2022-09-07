import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
// screens
import Home from "../Home";
import Blog from "../Blog";
import Conversor from "../Conversor";
import Settings from "../Settings";

const Tab: any = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Conversor"
      tabBarOptions={{
        activeTintColor: "#CAF99B",
        activeBackgroundColor: "#32089A",
        inactiveTintColor: "#4B9600",
        inactiveBackgroundColor: "#32089A",
      }}
      screenOptions={{
        tabBarActiveTintColor: "#CAF99B",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Blog"
        component={Blog}
        options={{
          tabBarLabel: "News",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Conversor"
        component={Conversor}
        options={{
          tabBarLabel: "Conversor",
          headerShown: false,
        }}
      />
      {/* <Tab.Screen name='Porfolio' component={Porfolio} /> */}
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
export default function LoggedNavigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
