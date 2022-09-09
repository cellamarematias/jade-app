import {Text, View, StyleSheet, Linking } from 'react-native';
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
			url={'../../assets/images/blog1.jpg'} urlLink={'https://www.binance.com/es/blog/nft/c%C3%B3mo-pueden-la-blockchain-y-los-nft-descentralizar-tu-identidad-digital-en-la-web3-5982381359862285069'}></BlogCard>
			<BlogCard text={'Tres maneras para lograr vender tu Bitcoin por dinero en efectivo: Una guía rápida de Binance'} url={''} urlLink={'https://www.binance.com/es/blog/all/tres-maneras-para-lograr-vender-tu-bitcoin-por-dinero-en-efectivo-una-gu%C3%ADa-r%C3%A1pida-de-binance-421499824684900899'}></BlogCard>
      <BlogCard text={'Curso gratis de Blockcahin y Web3'} urlLink={'https://www.binance.com/es/blog/community/consigue-un-curso-gratis-de-blockchain-y-web3-7084372631818180324'}></BlogCard>
			<BlogCard text={'¿Qué pasará con mi Ethereum tras la fusión?'} urlLink={'https://www.binance.com/es/blog/markets/qu%C3%A9-pasar%C3%A1-con-mi-ethereum-tras-la-fusi%C3%B3n-7301497613864205089'}></BlogCard>
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