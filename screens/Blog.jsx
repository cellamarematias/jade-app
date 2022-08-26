import {Text, View, StyleSheet } from 'react-native';
import BlogCard from '../components/shared/BlogCard';
import Header from '../components/shared/header';

export default function Blog() {
  return (
    <View style={styles.container}>
			<Header></Header>
			<View style={styles.Headercontainer}>
				<Text style={styles.headerOne}>Crypto</Text><Text style={styles.headerTwo}>Blog</Text>
			</View>
			<Text style={styles.subheading}>Conocé el mundo Crypto!</Text>
      <BlogCard text={'¿Cómo pueden la blockchain y los NFT descentralizar tu identidad digital en la Web3?'}
			url={'../../assets/images/blog1.jpg'}></BlogCard>
			<BlogCard text={'Tres maneras para lograr vender tu Bitcoin por dinero en efectivo: Una guía rápida de Binance'} url={''}></BlogCard>
      <BlogCard text={'Hablamos de Criptomonedas con Expertos'}></BlogCard>
			<BlogCard text={'Guía de Binance P2P para principiantes'}></BlogCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#130040',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
	Headercontainer: {
		flexDirection: 'row',
		marginBottom: 40
	},
	headerOne: {
		backgroundColor: '#130040',
		color: 'white',
		fontSize: 40,
		fontWeight: 'bold',
		textTransform: 'uppercase'
	},
	headerTwo: {
		backgroundColor: '#130040',
		color: '#ABFB5C',
		fontSize: 40,
		fontWeight: 'bold',
		textTransform: 'uppercase'
	},
	subheading: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		marginBottom: 20
	}
});