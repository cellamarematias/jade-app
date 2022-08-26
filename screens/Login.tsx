import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const Login = () => {
	return (
		<View>
			<Text style={styles.container}>Login</Text>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#130040',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;