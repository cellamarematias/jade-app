import React from "react";
import { View, Text, StyleSheet, Image, Linking } from "react-native";

interface BlogCard {
  title: string;
  url: string;
}

const BlogCard: React.FC<BlogCard> = ({ title, url }) => (
  <View key={url} style={styles.container}>
    <Image style={styles.tinyLogo} source={require("../../assets/blog1.jpg")} />
    <View style={styles.center}>
      <Text
        numberOfLines={3}
        style={styles.heading}
        onPress={() => Linking.openURL(url)}
      >
        {title as any}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 80,
    backgroundColor: "#6053DD",
    borderRadius: 5,
    shadowColor: "white",
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  tinyLogo: {
    width: 60,
    height: 60,
    marginHorizontal: 10
  },
  center: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    justifyContent: "center",
    paddingLeft: 8,
    maxWidth: "90%",
    fontWeight: "400",
    color: '#fff',
    letterSpacing: 1.3
  },
});

export default BlogCard;
