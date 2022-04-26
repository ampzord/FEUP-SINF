import React from 'react';
import { StyleSheet,ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import _ from 'lodash'
import ClientForm from '../components/ClientForm'; 

export default class ClientListScreen extends React.Component {
  static navigationOptions = {
    title: 'Clientes',
  };

  constructor(props) {
    super(props);
    this.navigateToClient = this.navigateToClient.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  state = {
    clients: []
  }

  navigateToClient(clientKey) {
    this.props.navigation.navigate('ClientProfile', { clientKey: clientKey })
  }

  loadData() {
    fetch(global.serverUrl + '/clients', global.getOptions)
    .then(response => response.json())
    .then(clients => {
      console.log(clients)
      this.setState({
        clients
      })
    })
  }

  componentDidMount() {
    this.loadData()
  }

  render() {
    return (
    <View style={styles.container}> 
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {
          this.state.clients.map(client => {
            return (
              <ClientForm
                key={client.Cliente}
                url={require('../assets/images/client.png')}
                clientKey={client.Cliente}
                company={client.Nome}
                type={client.Fac_Mor}
                vendas={client.Pais}
                navigate={this.navigateToClient}
              /> 
            )
          })
        }      
      </ScrollView>
      <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('CreateCliente', { reload: this.loadData })} style={styles.TouchableOpacityStyle} >
        <Image 
          source={{uri : 'https://image.flaticon.com/icons/png/512/189/189755.png'}}   
          style={styles.FloatingButtonStyle}
        />  
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
