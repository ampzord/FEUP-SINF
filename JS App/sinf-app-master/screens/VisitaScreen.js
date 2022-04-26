import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
  TouchableHighlight,
  TextInput
} from 'react-native';

import { Button } from 'react-native';


export default class VisitaScreen extends Component {

  constructor(props) {
    super(props);
    this._save = this._save.bind(this)
    this._finish = this._finish.bind(this)
    this._addProposal = this._addProposal.bind(this)
  }

  state = {
    visit: {}
  }

  _save() {
    fetch(global.serverUrl + '/agenda/' + this.state.visit.id, {
      ...global.postOptions,
      body: JSON.stringify({
        report: this.state.visit.report,
        done: false
      })
    })
    .then(response => response.json())
    .then(visit => {
      this.setState({ visit })
      Alert.alert('Visita atualizada!')
    })
    .catch(error => {
      console.error(error)
      Alert.alert('Ocorreu um erro, tente novamente.')
    })
  }

  _finish() {
    fetch(global.serverUrl + '/agenda/' + this.state.visit.id, {
      ...global.postOptions,
      body: JSON.stringify({
        report: this.state.visit.report,
        done: true
      })
    })
    .then(response => response.json())
    .then(visit => {
      this.setState({ visit })
      Alert.alert('Visita concluida!')
    })
    .catch(error => {
      console.error(error)
      Alert.alert('Ocorreu um erro, tente novamente.')
    })
  }

  _addProposal() {
    this.props.navigation.navigate('CreteOrc', { reload: () => {}, visit: this.state.visit })
  }

  componentDidMount() {
    const visitKey = this.props.navigation.getParam('visitID', undefined)
    fetch(`${global.serverUrl}/agenda/${visitKey}`, global.getOptions)
    .then(response => response.json())
    .then(visit => {
      console.log(visit)
      this.setState({
        visit
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.header}></View>

          <Image style={styles.avatar} source={require('../assets/images/v1.png')}/>
          
          <View style={styles.bodyText}>

            <View style={styles.bodyContent}>   
              <Text style={styles.name}> #Visita {this.state.visit.id} </Text>
              <Text style={styles.info}> {this.state.visit.client_name} </Text>

              { this.state.visit.done && <Text style={styles.info}> CONCLUIDA </Text> }
            </View>

            <View style={{padding: 20}} >
              <Text style={styles.leftAlign1} > Local: </Text>
              <Text style={styles.leftAlign2}> {this.state.visit.client_address}</Text>
              <Text style={styles.leftAlign1}> A fazer: </Text>
              <Text style={styles.leftAlign2}> {this.state.visit.todo}</Text>
            </View>

            <View style={{padding: 20}} >
              <Text style={styles.leftAlign1} > Report: </Text>
              <TextInput
                placeholder='Comece aqui...'
                onChangeText={(text) => {
                  this.setState({ visit: { ...this.state.visit, report: text } })
                }}
                value={this.state.visit.report}
              />
            </View>
            
            { !this.state.visit.done &&
              <TouchableHighlight
                style ={{
                  height: 40,
                  width:160,
                  borderRadius:10,
                  backgroundColor : "#f2f2f2",
                  marginLeft :15,
                  marginRight:40,
                  marginTop :20,
                  marginBottom: 20,
                }}>
                <Button onPress={this._save}            
                  title="Guardar"
                  disabled={!(this.state.visit.report && this.state.visit.report.length > 0)}
                />
              </TouchableHighlight>
            }

            { !this.state.visit.done &&
              <TouchableHighlight
                style={{
                  height: 40,
                  width:160,
                  borderRadius:10,
                  backgroundColor : "#f2f2f2",
                  marginLeft :15,
                  marginRight:40,
                  marginTop :20,
                  marginBottom: 20,
                }}>
                <Button onPress={this._finish}            
                  title="Concluir"
                  disabled={!(this.state.visit.report && this.state.visit.report.length > 0)}
                />
              </TouchableHighlight>
            }

            { this.state.visit.done &&
              <TouchableHighlight
                style={{
                  height: 40,
                  width:200,
                  borderRadius:10,
                  backgroundColor : "#f2f2f2",
                  marginLeft :15,
                  marginRight:40,
                  marginTop :20,
                  marginBottom: 50,
                }}>
                <Button onPress={this._addProposal}            
                  title="Adicionar Orçamento"
                />
              </TouchableHighlight>
            }
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

  leftAlign1: {
    textAlign: 'left', 
    alignSelf: 'stretch',
    marginBottom: 15,
    fontSize: 20,
  },
  leftAlign2: {
    textAlign: 'left', 
    alignSelf: 'stretch',
    marginBottom: 15,
    fontSize: 20,
    color:'grey'
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
    textAlign: 'left',
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