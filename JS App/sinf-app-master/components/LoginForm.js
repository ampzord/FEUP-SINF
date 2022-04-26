import React from 'react';
import {
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { StackNavigator } from 'react-navigation';

export default class LoginForm extends React.Component {

  constructor(props) {
    super(props)
    this._onPressButton = this._onPressButton.bind(this)
  }

  state = {
    username: 'rfonseca',
    password: 'sinfefixe'
  }

  _onPressButton() {
    this.props.auth(this.state.username, this.state.password)
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          underLineColerAndroid='transparent'
          placeholder='Username'
          style={styles.textinput}
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          secureTextEntry={true}
          underLineColerAndroid='transparent'
          placeholder='Password'
          style={styles.textinput}
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
        />
        
        <TouchableOpacity style={styles.loginbtn} onPress={this._onPressButton.bind(this)}>
          <Text style={{color:'white'}}> Login </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textinput:{
    color: '#fff',
    alignSelf: 'stretch',
    padding: 20,
    marginBottom:30,
    backgroundColor:'rgba(255,255,255, 0.2)',
    borderWidth: 0.9,
  },


  loginbtn:{
    color: '#fff',
    alignSelf: 'stretch',
    padding: 12,
    marginTop: 4,
    alignItems: 'center',
    backgroundColor:'#001a1a',
    borderWidth: 0.1,
    width: 100,
    opacity: 0.4,
    marginLeft: '35%',
  }

});

