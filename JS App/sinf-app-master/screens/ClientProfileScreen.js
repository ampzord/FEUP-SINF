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

import GoogleStaticMap from 'react-native-google-static-map';
import openMap from 'react-native-open-maps'

export default class ClientProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    client: {},
    location: {}
  }

  componentDidMount() {
    const clientKey = this.props.navigation.getParam('clientKey', undefined)

    fetch(global.serverUrl + '/clients/' + clientKey, global.getOptions)
    .then(response => response.json())
    .then(client => {
      console.log(client)
      this.setState({
        client
      })

      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${client.Morada.split(' ').join('+')}&key=AIzaSyAr0SpMlsTQ00ZjI96tC_CWrYet1DbORqY`)
      .then(response => response.json())
      .then(result => {
        this.setState({ location: result.results[0].geometry.location })
      })

    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.header}></View>

          <Image style={styles.avatar} source={require('../assets/images/client.png')}/>
          
          <View style={styles.bodyText}>
            <View style={styles.bodyContent}>   
              <Text style={styles.name}>{this.state.client.Nome}</Text>
              <Text style={styles.description}> Contacto: {this.state.client.Telefone} </Text>
              <Text style={styles.info}> {this.state.client.EnderecoWeb}</Text>
              <Text style={styles.description}> {this.state.client.Morada} </Text>
              <Text style={styles.description}> {this.state.client.CodigoPostal} </Text>
              <Text style={styles.description}> {this.state.client.LocalidadeCodigoPostal} </Text>
            </View>
          </View>
          
          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
            <TouchableOpacity onPress={() => { openMap({ latitude: this.state.location.lat, longitude: this.state.location.lng }) }}>
              <GoogleStaticMap
                latitude={`${this.state.location.lat}`}
                longitude={`${this.state.location.lng}`}
                hasCenterMarker
                format={'png'}
                zoom={13}
                size={{ width: 250, height: 250 }}
                apiKey={'AIzaSyAr0SpMlsTQ00ZjI96tC_CWrYet1DbORqY'}
              />
            </TouchableOpacity>
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
    backgroundColor: "#008060",
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
    borderColor: '#004d39'
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
    paddingBottom: 12,
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
    margin: 15,
    borderRadius:10,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
    backgroundColor: '#fff',
    padding:8,
  }
});