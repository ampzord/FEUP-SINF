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
  Alert
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText'; 
import { StackNavigator } from 'react-navigation';
import moment from 'moment'

export default class EncomendaForm extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this._onPressButton = this._onPressButton.bind(this);
  }

  _onPressButton() {
    this.props.navigate(this.props.encomendaID)
  }

  render() {
    
    return (
      <View style={styles.container}>
       
        {/* ROW 1 */}
        <View style={styles.rowA}> 

          {/* left Side */}
          <View style={styles.childrenA}>
          
              <ImageBackground source={this.props.url} style={styles.bg}>     
              </ImageBackground>
          </View>

          {/* Right Side */}
          <View style={styles.childrenB}>   

            <View style={styles.text}>

              <View style={{marginBottom: 5}}>
                <Text style={{fontSize: 22,fontWeight: 'bold'}}> {this.props.name} </Text>
              </View>
              <View style={{marginBottom: 5}}>
                <Text style={{color: "#737373"}}> Codigo: #2018{this.props.numDoc}</Text>
              </View>
              <View style={{marginBottom: 5}}>
                <Text style={{color: "#737373"}}> Fim: {this.props.dataCarga}</Text> 
              </View>       
                           
            </View>
          </View>

          {/* End Side */}
          <View style={styles.childrenC}>
            <TouchableOpacity style={styles.loginbtn} onPress={this._onPressButton}>
              <Text style={{color:'#b3b3b3',fontSize:20}}> > </Text>  
            </TouchableOpacity> 
          </View>
        </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingLeft:10,
    paddingRight: 10,
  },
  title: {
    paddingBottom: 12,
    paddingTop: 6,
  },
  text: {
    flex: 1,
    flexDirection: 'column'
  },
  rowA: {
    margin: 6, 
    color: 'rgba(0,0,0,0.4)',
    lineHeight: 1,
    textAlign: 'center',
    padding:15,
    borderRadius:10,
    backgroundColor: 'white',
    flex: 2, flexDirection: 'row'
  },
    childrenA: {
    fontSize: 143,
    margin: 0,
    flex: 0.5,
    flexDirection: 'column',
    padding:0,
  }, 
  childrenB: {
    fontSize: 143,
    margin: 0,
    flex: 1.5,
    padding:5,
    paddingLeft:15,
  },

  bg:{
    flex: 1,
    justifyContent: 'center',
    resizeMode:'cover',
    width: 70,
    height:70,
  },
    childrenC: {
    margin: 0,
    flex: 0.3,
    alignItems: 'center',
  },
  loginbtn:{
    flex:0.2,
    color: '#f2f2f2',
    alignSelf: 'stretch',
    marginTop: 45,
    width: 20,
    height:20,
    fontWeight: 'bold',
    marginLeft:'50%',
    marginRight:'50%'
  }
});
