import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from 'react-native';
import { StackedBarChart } from 'react-native-svg-charts'
import _ from 'lodash'

export default class ProductScreen extends Component {
  state = {
    product: {},
    sales: [],
    stock: 0
  }

  componentDidMount() {
    const productKey = this.props.navigation.getParam('productKey', undefined)

    fetch(`${global.serverUrl}/products/${productKey}`, global.getOptions)
    .then(response => response.json())
    .then(product => {
      console.log(product)
      this.setState({
        product
      })
    })

    fetch(`${global.serverUrl}/products/${productKey}/sales`, global.getOptions)
    .then(response => response.json())
    .then(sales => {
      _.forEach(sales, o => {
        o.TotalSubtraido = o.Total - o.TotalVendedor
      })
      console.log(sales)
      this.setState({
        sales: sales
      })
    })

    fetch(`${global.serverUrl}/products/${productKey}/stock`, global.getOptions)
    .then(response => response.json())
    .then(stock => {
      this.setState({
        stock: stock.StkActual
      })
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.header}></View>

          <Image style={styles.avatar} source={require('../assets/images/m1.jpg')}/>
          
          <View style={styles.bodyText}>
            <View style={styles.bodyContent}>   
              <Text style={styles.name}> {this.state.product.Descricao} </Text>
              <Text style={styles.info}> {this.state.product.DescricaoComercial}</Text>
              <Text style={styles.description}>Tubo para baixa e média pressão.
                Recomendado para passagem de óleo
                mineral e vegetal, emulsões aquosas, água,
                ar e gases inertes </Text>
              </View>
          </View>

        {/* ROW 2 */}
        <View style={styles.rowB}>
          <View style={styles.title}>
            <View>
              <Text style={{color:'#666666', fontSize: 22, fontWeight: 'bold'}}> Stock Disponivel:  </Text> 
            </View>
            <View>
              <Text style={{color:'#999999', fontSize: 22}}> {this.state.stock}  </Text>
            </View>
          </View>
          
          <View>
            <StackedBarChart
              style={{ height: 200 }}
              keys={['TotalSubtraido', 'TotalVendedor']}
              colors={['#32BDA6', '#65d6c4']}
              data={this.state.sales}
              contentInset={{ top: 30, bottom: 30 }}
            />

            {/*
            <ImageBackground source={require('../assets/images/g3.png')} style={styles.bg}>     
            </ImageBackground>
            */}
          </View>
        </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  header:{
    backgroundColor: "#0d0d0d",
    opacity:0.7,
    height:100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:30,
    borderColor: '#8c8c8c'
  },
  name:{
    fontSize:22,
    color:"black",
    fontWeight:'600',
  },
  bodyText:{
    marginTop:60,
    backgroundColor: 'white',
    height:'24%'
  },
  bodyChart:{
    marginTop:5,
    backgroundColor: 'white',
    height:'40%'
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  title: {
    paddingBottom: 30,
    flexDirection: 'row',
    paddingTop: 6,
  },
  rowA: {
    margin: 10,
    color: 'rgba(0,0,0,0.4)',
    lineHeight: 19,
    textAlign: 'center',
    padding:5,
    backgroundColor: '#f2f2f2',
    flex: 1, flexDirection: 'row'
  },
  rowA_children: {
    fontSize: 143,
    width: '47%',
    margin: 4,
    backgroundColor: '#fff',
    borderRadius:6,
    flex: 1,
    flexDirection: 'column',
    padding:5,
  },
  bg:{
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    width: null,
    height:150,

    padding: 20,
  },
  rowB: {
    marginTop: 35,
    borderRadius:10,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
    backgroundColor: '#fff',
    padding:15,
  }
});