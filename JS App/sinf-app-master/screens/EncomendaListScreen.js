import React from 'react';
import { StyleSheet,TouchableOpacity, Text, View,ScrollView,ImageBackground,FloatingAction,Image } from 'react-native';
import ListItems from '../components/ListItems';
import _ from 'lodash'
import EncomendaForm from '../components/EncomendaForm'; 
import Btn from '../components/Btn';
import { SearchBar } from 'react-native-elements'
import { Button } from 'react-native';

export default class EncomendaListScreen extends React.Component { 
  static navigationOptions = {
    title: 'Encomendas',
  }; 

  constructor(props) {
    super(props);
    this.navigateToEncomendaCreateScreen = this.navigateToEncomendaCreateScreen.bind(this);
    this.navigateToEncomendaScreen = this.navigateToEncomendaScreen.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  navigateToEncomendaCreateScreen(encomenda) {
      this.props.navigation.navigate('CreateEncomenda', { reload: this.loadData })

  }

  navigateToEncomendaScreen(encomendaID) {
      this.props.navigation.navigate('EncomendaScreen', { ID: encomendaID })
  }

  state = {
    encomendas: []
  }
  
  loadData() {
    console.log("ENTRAAAAAAR")
    fetch(global.serverUrl + '/sales/orders', global.getOptions)
    .then(response => response.json())
    .then(encomendas => {
      console.log(encomendas)
      this.setState({
        encomendas
      })
    })
  }

  componentDidMount() {
    this.loadData()
  }

  render() {
    return (
    <View style={styles.container}>

    <SearchBar 
      lightTheme
      clearIcon={{ color: 'white' }}
      showLoading
      platform="ios"
      cancelButtonTitle="Cancel"
      placeholder='Search' />

     <ScrollView style={[styles.container, styles.mg_top]} contentContainerStyle={styles.contentContainer}>
        {
            this.state.encomendas.map(encomenda => {
              return (
                <EncomendaForm
                  key={encomenda.Id}
                  encomendaID={encomenda.Id}
                  url={require('../assets/images/enc.png')}
                  name={encomenda.Nome}
                  numDoc={encomenda.NumDoc}
                  dataCarga={encomenda.DataCarga}
                  navigate={this.navigateToEncomendaScreen}
                  />  
              )
          })
        }  
      

      </ScrollView>

      <TouchableOpacity activeOpacity={0.5} onPress={this.navigateToEncomendaCreateScreen} style={styles.TouchableOpacityStyle} >
          <Image source={{uri : 'https://image.flaticon.com/icons/png/512/189/189755.png'}}   
                 style={styles.FloatingButtonStyle} />  
        </TouchableOpacity>
        
    </View>    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  mg_top: {
    marginTop: 15
  },
  TouchableOpacityStyle:{
 
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
 
  FloatingButtonStyle: {
 
    resizeMode: 'contain',
    width: 50,
    height: 50,
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