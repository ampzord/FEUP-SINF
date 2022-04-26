import React from 'react';
import { StyleSheet,TouchableOpacity, Text, View,ScrollView,ImageBackground,FloatingAction,Image } from 'react-native';
import ListItems from '../components/ListItems';
import _ from 'lodash'
import OrcamentoForm from '../components/OrcamentoForm'; 
import VisitaForm from '../components/VisitaForm'; 
import Btn from '../components/Btn';
import { SearchBar } from 'react-native-elements'
import { Button } from 'react-native';

export default class LinksScreen extends React.Component { 
  static navigationOptions = {
    title: 'Visitas',
  }; 

  constructor(props) {
    super(props);
    this.navigateToCreateVisit = this.navigateToCreateVisit.bind(this);
    this.navigateToVisit = this.navigateToVisit.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  navigateToVisit(visitID) {
      this.props.navigation.navigate('VisitaScreen', { visitID })
  }

  navigateToCreateVisit() {
      this.props.navigation.navigate('CreateVisita', { reload: this.loadData })
  }

  state = {
    visitas: []
  }

  loadData() {
    fetch(global.serverUrl + '/agenda', global.getOptions)
    .then(response => response.json())
    .then(visitas => {
      console.log(visitas)
      this.setState({
        visitas
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
          placeholder='Search'
        />

        <ScrollView style={[styles.container, styles.mg_top]} contentContainerStyle={styles.contentContainer}>
          {
            this.state.visitas.map(visita => {
              return (       
                <VisitaForm
                  key={visita.id}
                  url={require('../assets/images/v1.png')}
                  visitKey={visita.id}
                  company={`#${visita.id} - ${visita.client_name}`}
                  local={visita.client_address}
                  date={visita.visit_date}
                  navigate={this.navigateToVisit}
                />
              )
            })
          }  
        </ScrollView>

        <TouchableOpacity activeOpacity={0.5} onPress={this.navigateToCreateVisit} style={styles.TouchableOpacityStyle} >
          <Image source={{uri : 'https://image.flaticon.com/icons/png/512/189/189755.png'}} style={styles.FloatingButtonStyle} />  
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

  