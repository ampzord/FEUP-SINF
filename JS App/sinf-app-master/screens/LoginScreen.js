import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import LoginForm from '../components/LoginForm';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
    headerVisible: false,
  };

  constructor(props) {
    super(props)
    this.auth = this.auth.bind(this)
  }

  auth(username, password) {
    fetch(global.serverUrl + '/login', {
      ...global.postOptions,
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      this.props.navigation.navigate('Main')
    })
  }

  render() {
    return (
      <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.bg}>
        <LoginForm auth={this.auth}/>
      </ImageBackground>
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

  bg:{
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'stretch',
    width: null,
    padding: 20,
  }
});

