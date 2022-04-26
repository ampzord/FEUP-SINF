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
  TextInput,
  Platform
} from 'react-native';
import { Icon } from 'expo';
import _ from 'lodash';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker'
import DateTimePicker from 'react-native-modal-datetime-picker';

import { Button } from 'react-native';
import moment from 'moment'

export default class CreateVisitaScreen extends Component {

  constructor(props) {
    super(props);
    this._onPressButton = this._onPressButton.bind(this);
  }

  state = {
    pickedClient: undefined,
    clientes: [],
    todo: '',
    visit_date: null,
    isDateTimePickerVisible: false
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({ visit_date: date })
    this._hideDateTimePicker();
  };

  clientListConvert(){
    return _.map(this.state.clientes,cliente=>{
      return {label: cliente.Nome, value: cliente, key: cliente.Cliente}
    })
  }

  componentDidMount(){ 

    // Get All Clients 
    fetch(global.serverUrl + '/clients', global.getOptions)
    .then(response => response.json())
    .then(clientes => {
      console.log(clientes)
      this.setState({
        clientes
      })
    })
  }

  _onPressButton() {
    console.log('VISIT DATE', this.state.visit_date)
    fetch(global.serverUrl + '/agenda', {
      ...global.postOptions,
      body: JSON.stringify({
        client_id: this.state.pickedClient.Cliente,
        client_name: this.state.pickedClient.Nome,
        client_address: this.state.pickedClient.Fac_Mor,
        visit_date: moment(this.state.visit_date).format(),
        todo: this.state.todo
      })
    })
    .then(response => {
      if (response.status === 200) {
        Alert.alert('Visita criada!')
        let reload = this.props.navigation.getParam('reload', () => {})

        reload()
        this.props.navigation.navigate('Visitas')
      } else {
        Alert.alert('Ocorreu um erro a criar a visita...')
      }
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
              <Text underLineColerAndroid='' style={styles.name}> #Visitar Cliente </Text>
              <Text underLineColerAndroid='' style={styles.info}> Futuras Agendas </Text>
            </View>

            <View style={{padding:20, flex:1 , flexDirection: 'row'}} >
              <View style={{flex:0.50, padding: 6}} >
                <RNPickerSelect 
                  placeholder={{ label: 'Clientes...', key: 'lista_clientes' }}
                  items={this.clientListConvert()}
                  onValueChange={(value) => {
                      this.setState({
                          pickedClient: value,
                      });
                      console.log(value)
                  }}
                  onUpArrow={() => {
                      this.inputRefs.name.focus();
                  }}
                  onDownArrow={() => {
                      this.inputRefs.picker2.togglePicker();
                  }}
                  style={{ ...pickerSelectStyles }}
                  value={this.state.pickedClient}       
                />
              </View>
              <View style={{flex:0.30 , padding: 6}}>
                <Text>{this.state.visit_date !== null ? moment(this.state.visit_date).format('DD/MM/YYYY HH:mm') : ''}</Text>
              </View>
              <View style={{flex:0.20 , padding: 6}}>
                <TouchableOpacity onPress={this._showDateTimePicker}>
                  <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} size={44}/>
                </TouchableOpacity>
                <DateTimePicker
                  mode={'datetime'}
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                />
              </View>
            </View>

            <View style={{padding: 20}} >
              <Text style={styles.leftAlign1} > A fazer: </Text>
              <TextInput 
                underLineColerAndroid=''
                placeholder='Escreva aqui...'
                style={{color: '#85adad',marginLeft: 2,fontSize: 22}}
                onChangeText={text => { this.setState({ todo: text }) }}
              />
            </View>

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
            <Button onPress={this._onPressButton}            
            title="Criar"
            accessibilityLabel="Learn more about this button"
          /> 
          </TouchableHighlight> 

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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});