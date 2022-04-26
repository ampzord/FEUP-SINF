import React from 'react';
import { StyleSheet,TouchableOpacity, Text, View,ScrollView,ImageBackground,FloatingAction,Image } from 'react-native';
import ListItems from '../components/ListItems';
import _ from 'lodash'
import FaturaForm from '../components/FaturasForm'; 
import Btn from '../components/Btn';
import { SearchBar } from 'react-native-elements'
import { Button } from 'react-native';

export default class FaturaListScreen extends React.Component { 
  static navigationOptions = {
    title: 'Faturas',
  }; 

  constructor(props) {
    super(props);
    this.navigateToFaturaScreen = this.navigateToFaturaScreen.bind(this);
    this.navigateToCreateFatura = this.navigateToCreateFatura.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  navigateToCreateFatura(fatura) {
      this.props.navigation.navigate('CreateFatura', { reload: this.loadData })
  }

  navigateToFaturaScreen(faturaID) {
      this.props.navigation.navigate('FaturaScreen', { ID: faturaID })
  }

  state = {
    faturas: []
  }

   loadData() {
    fetch(global.serverUrl + '/sales/invoices', global.getOptions)
    .then(response => response.json())
    .then(faturas => {
      console.log(faturas)
      this.setState({
        faturas
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

     <ScrollView style={styles.container, styles.mg_top} contentContainerStyle={styles.contentContainer}>
        {
            this.state.faturas.map(fatura => {
              return (       
                <FaturaForm
                  key={fatura.Id}
                  faturaID={fatura.Id}
                  url={require('../assets/images/fat.png')}
                  name={fatura.Nome}
                  numDoc={fatura.NumDoc}
                  totalDoc={fatura.TotalDocumento}
                  navigate={this.navigateToFaturaScreen}
                  /> 
              )
          })
        }  

      </ScrollView>

      <TouchableOpacity activeOpacity={0.5} onPress={this.navigateToCreateFatura} style={styles.TouchableOpacityStyle} >
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