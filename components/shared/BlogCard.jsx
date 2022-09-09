import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from "react-native";


const BlogCard = (props) => (
  <View key={props.id} style={styles.container}>
		<View>
		<Image
        style={styles.tinyLogo}
				source={require( '../../assets/blog1.jpg')}
      />
		</View>
		<View style={styles.center}>
			<Text numberOfLines={3} style={styles.heading} onPress={() => Linking.openURL(props.urlLink)}>{props.text}</Text>
		</View>
  </View>
)

const styles = StyleSheet.create({
  container: {
		flexDirection: "row",
		margin: 5,
		width: '95%',
		backgroundColor: '#6053DD',
    padding: 15,
		paddingStart: 5,
    paddingBottom: 5,
    paddingTop: 5,
		borderRadius: 5,
		shadowOffset: {width: 2, height: 4},
		shadowColor: "white",
		shadowOpacity: 0.5,
		shadowRadius: 3,
  },
  image: {
    width: 58,
    height: 48,
    borderRadius: 4
  },
	tinyLogo: {
    width: 60,
    height: 60,
  },
	center: {
		justifyContent: 'center'
	},
	heading: {
		justifyContent: 'center',
		paddingLeft: 8,
		maxWidth: '90%',
		fontWeight: 'bold',
	}
})

export default BlogCard;