import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AntDesign, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';

// screens
import Home from "../Home";
import Blog from "../Blog";
import Conversor from "../Conversor";
import Settings from "../Settings";
import Market from "../Market";
import MyCoins from "../MyCoins";
import Logout from "../Logout";

const Tab: any = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Blog"
      screenOptions={{
        tabBarInactiveTintColor: '#6053DD',
        tabBarActiveTintColor: '#CAF99B',
        tabBarStyle: {
          backgroundColor: '#32089A',
          padding: 4
        }
      }}
    >
      {/* <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="home" size={24} color={focused ? "red" : "#6053DD"} />
          )
        }}
      /> */}
      <Tab.Screen
        name="Blog"
        component={Blog}
        options={{
          activeTintColor: 'red',
          inactiveTintColor: "grey",
          tabBarLabel: "",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome name="newspaper-o" size={24} color={focused ? "#CAF99B" : "#6053DD"}/>
          )
        }}
      />
      <Tab.Screen
        name="Converter"
        component={Conversor}
        options={{
          tabBarLabel: "",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome name="calculator" size={24} color={focused ? "#CAF99B" : "#6053DD"} />
          )
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarLabel: "",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5 name="coins" size={24} color={focused ? "#CAF99B" : "#6053DD"} />
          )
        }}
      />
      <Tab.Screen
        name="My Coins"
        component={MyCoins}
        options={{
          tabBarLabel: "",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="hearto" size={24} color={focused ? "#CAF99B" : "#6053DD"} />
          )
        }}
      />
      {/* <Tab.Screen name='Porfolio' component={Porfolio} /> */}
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="settings-outline" size={24} color={focused ? "#CAF99B" : "#6053DD"} />
          )
        }}
      />
      <Tab.Screen
        name="Logout"
        component={Logout}
        options={{
          tabBarLabel: "",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="logout" size={24} color={focused ? "#CAF99B" : "#6053DD"} />
          )
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
