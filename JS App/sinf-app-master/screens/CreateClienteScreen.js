import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TextInput,
  Button,
  Alert
} from 'react-native';
import _ from 'lodash';

export default class CreateClienteScreen extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    Cliente: 'C',
    Nome: 'Cliente Exemplo',
    Descricao: '',
    Morada: 'Rua Vieira Portuense',
    Localidade: 'Cedofeita',
    CodigoPostal: '4050-624',
    LocalidadeCodigoPostal: 'Porto',
    Telefone: '224664690',
    Fax: '',
    Website: 'www.cliente.com',
    Distrito: '',
    NumContribuinte: '989922456',
    Pais: 'PT',
    Moeda: 'EUR'
  };

  createClient() {
    fetch(global.serverUrl + '/clients', {
      ...global.postOptions,
      body: JSON.stringify({
        ...this.state
      })
    })
    .then(response => {
      if (response.status === 200) {
        Alert.alert('Cliente criado!')
        let reload = this.props.navigation.getParam('reload', () => {})
        reload()
        this.props.navigation.navigate('ClientList')
      } else {
        Alert.alert('Ocorreu um erro a criar o cliente...')
      }
    })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput 
          placeholder='ID'
          style={styles.textinput}
          value={this.state.Cliente}
          onChangeText={(Cliente) => this.setState({Cliente})}/>

        <TextInput 
          placeholder='Nome'
          style={styles.textinput}
          value={this.state.Nome}
          onChangeText={(Nome) => this.setState({Nome})}/>

        <TextInput 
          placeholder='Morada'
          style={styles.textinput}
          value={this.state.Morada}
          onChangeText={(Morada) => this.setState({Morada})}/>

        <TextInput 
          placeholder='Localidade'
          style={styles.textinput}
          value={this.state.Localidade}
          onChangeText={(Localidade) => this.setState({Localidade})}/>

        <TextInput 
          placeholder='CodigoPostal'
          style={styles.textinput}
          value={this.state.CodigoPostal}
          onChangeText={(CodigoPostal) => this.setState({CodigoPostal})}/>

        <TextInput 
          placeholder='LocalidadeCodigoPostal'
          style={styles.textinput}
          value={this.state.LocalidadeCodigoPostal}
          onChangeText={(LocalidadeCodigoPostal) => this.setState({LocalidadeCodigoPostal})}/>

        <TextInput 
          placeholder='Telefone'
          style={styles.textinput}
          value={this.state.Telefone}
          onChangeText={(Telefone) => this.setState({Telefone})}/>

        <TextInput 
          placeholder='Website'
          style={styles.textinput}
          value={this.state.Website}
          onChangeText={(Website) => this.setState({Website})}/>

        <TextInput 
          placeholder='NumContribuinte'
          style={styles.textinput}
          value={this.state.NumContribuinte}
          onChangeText={(NumContribuinte) => this.setState({NumContribuinte})}/>

        <TextInput 
          placeholder='Pais'
          style={styles.textinput}
          value={this.state.Pais}
          onChangeText={(Pais) => this.setState({Pais})}/>

        <TextInput 
          placeholder='Moeda'
          style={styles.textinput}
          value={this.state.Moeda}
          onChangeText={(Moeda) => this.setState({Moeda})}/>

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
          <Button onPress={this.createClient.bind(this)}            
            title="Criar"/> 
          </TouchableHighlight> 
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  textinput:{
    alignSelf: 'stretch',
    padding: 20,
    marginBottom:30,
    backgroundColor:'rgba(255,255,255, 0.2)',
    borderWidth: 0.9,
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