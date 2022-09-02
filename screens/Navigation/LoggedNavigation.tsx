import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

// screens
import Home from "../Home";
import Blog from "../Blog";
import Market from "../Market";
import MyCoins from "../MyCoins";

const Tab: any = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#CAF99B",
        activeBackgroundColor: "#141414",
        inactiveTintColor: "#fff",
        inactiveBackgroundColor: "#141414",
      }}
      screenOptions={{
        tabBarActiveTintColor: "#CAF99B",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Blog"
        component={Blog}
        options={{
          tabBarLabel: 'News',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarLabel: 'Market',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyCoins"
        component={MyCoins}
        options={{
          tabBarLabel: 'My Coins',
          headerShown: false,
        }}
      />
      {/* <Tab.Screen name='Conversor' component={Conversor} /> */}
      {/* <Tab.Screen name='Porfolio' component={Porfolio} /> */}
      {/* <Tab.Screen name='Settings' component={Settings} /> */}
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
