import React from 'react';
import { StyleSheet, Text, View,ScrollView,ImageBackground,FloatingAction } from 'react-native';
import ListItems from '../components/ListItems';
import _ from 'lodash'
import ProductForm from '../components/ProductForm'; 
import Btn from '../components/Btn';

export default class ProductListScreen extends React.Component {
  static navigationOptions = {
    title: 'Produtos',
  };

  constructor(props) {
    super(props);
    this.navigateToProduct = this.navigateToProduct.bind(this);
  }

  navigateToProduct(id) {
    this.props.navigation.navigate('ProductScreen', { productKey: id })
  }

  state = { 
    produtos: []
  }

  // TODO
  componentDidMount() {
    fetch(global.serverUrl + '/products', global.getOptions)
    .then(response => response.json())
    .then(produtos => {
        console.log(produtos)
        this.setState({
          produtos
        })
      })
  }

  render() {
    return (
    <View style={styles.container}> 
     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {
            this.state.produtos.map(produto => {
              return (       
                <ProductForm 
                  key={produto.Artigo}
                  url={require('../assets/images/m1.jpg')}
                  productKey={produto.Artigo}
                  descricao={produto.Descricao}
                  artigo={produto.Artigo}
                  navigate={this.navigateToProduct}
                  /> 
              )
          })
        }  

      </ScrollView>

     
    </View>    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
})

const actions = [{
    text: 'Accessibility',
    icon: require('../assets/images/t4.png'),
    name: 'bt_accessibility',
    position: 2
  }, {
    text: 'Language',
    icon: require('../assets/images/t4.png'),
    name: 'bt_language',
    position: 1
  }, {
    text: 'Location',
    icon: require('../assets/images/t4.png'),
    name: 'bt_room',
    position: 3
  }, {
    text: 'Video',
    icon: require('../assets/images/t4.png'),
    name: 'bt_videocam',
    position: 4
  }];