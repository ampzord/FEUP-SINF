import React from 'react';
import { StyleSheet,TouchableOpacity,Alert, Text, View,ScrollView,ImageBackground,FloatingAction,Image } from 'react-native';
import ListItems from '../components/ListItems';
import _ from 'lodash'
import OrcamentoForm from '../components/OrcamentoForm'; 
import Btn from '../components/Btn';
import { SearchBar } from 'react-native-elements'
import { Button } from 'react-native';

export default class LinksScreen extends React.Component { 
  static navigationOptions = {
    title: 'Orçamentos',
  }; 

  constructor(props) {
    super(props);
    this.navigateToOrcScreen = this.navigateToOrcScreen.bind(this);
    this.navigateToOrc = this.navigateToOrc.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  navigateToOrc(orc) {
      this.props.navigation.navigate('CreteOrc', { reload: this.loadData })
  }

  navigateToOrcScreen(orcID) {
    //Alert.alert("OrcID: " + orcID)
    this.props.navigation.navigate('OrcScreen', { ID: orcID })
  }

  state = {
    orcamentos: []
  }

  loadData() {
    fetch(global.serverUrl + '/sales/quotations', global.getOptions)
    .then(response => response.json())
    .then(orcamentos => {
      this.setState({
        orcamentos
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
            this.state.orcamentos.map(orcamento => {
              return (
                <OrcamentoForm 
                  key={orcamento.Id}
                  orcamentoId={orcamento.Id}
                  url={require('../assets/images/orc.png')}
                  name={orcamento.Nome}
                  dataCriacao={orcamento.DataCriacao}
                  numDoc={orcamento.NumDoc}
                  navigate={this.navigateToOrcScreen}
                  /> 
              )
          })
        }  
         
      </ScrollView>

      <TouchableOpacity activeOpacity={0.5} onPress={this.navigateToOrc} style={styles.TouchableOpacityStyle} >
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