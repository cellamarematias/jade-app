import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens here
import Login from './screens/Loogin';

const Stack = createNativeStackNavigator();

// el orden de las pantallas se corresponden al orden en el que se muestran
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
