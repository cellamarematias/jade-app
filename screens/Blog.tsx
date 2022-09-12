import { stringify } from "querystring";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Linking, ScrollView } from "react-native";
import { Interface } from "readline";
import BlogCard from "../components/shared/BlogCard";
import Header from "../components/shared/header";

interface news {
  title: string;
  url: string;
}
export default function Blog() {
  const [news, setNews] = useState<news[]>([]);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "ae1417c436msh9f522498f2ef496p16b829jsnec2595801478",
      "X-RapidAPI-Host": "crypto-news-live3.p.rapidapi.com",
    },
  };
  useEffect(() => {
    getData();
  }, []);
  console.log("newsssssssssss", news);

  const getData = () => {
    fetch("https://crypto-news-live3.p.rapidapi.com/news", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setNews(response);
      })
      .catch((err) => console.error(err));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header></Header>
        <View style={styles.Headercontainer}>
          <Text style={styles.headerOne}>Crypto</Text>
          <Text style={styles.headerTwo}>Blog</Text>
        </View>
        <Text style={styles.subheading}>Conocé el mundo Crypto!</Text>
        {news.map((newsToShow) => {
          return (
            <BlogCard
              key={newsToShow.url}
              title={newsToShow.title}
              url={newsToShow.url}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#130040",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  Headercontainer: {
    flexDirection: "row",
    marginBottom: 40,
  },
  headerOne: {
    backgroundColor: "#130040",
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  headerTwo: {
    backgroundColor: "#130040",
    color: "#ABFB5C",
    fontSize: 40,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
});
