import React from 'react';
import { StyleSheet,Alert,TouchableHighlight, Text,Button,TextInput,Image, View,ScrollView,ImageBackground,FloatingAction } from 'react-native';
import ListItems from '../components/ListItems';
import _ from 'lodash'
import ProductForm from '../components/ProductForm'; 
import Btn from '../components/Btn';
import RNPickerSelect from 'react-native-picker-select';

export default class FaturaScreen extends React.Component {
  static navigationOptions = {
    title: 'Fatura',
  };

  constructor(props) {
    super(props);
  }

  state = {
    favColor: undefined,
    items: [
        {
            label: 'Ardion',
            value: 'Ardion',
        },
        {
            label: 'Intel',
            value: 'Intel',
        },
        {
            label: 'Company DHL',
            value: 'Company',
        },{
            label: 'TubeCMP',
            value: 'TubeCMP',
        },
    ],
    rows: [],
    fatura: {
      header: {},
      rows: [ ]
    }
  };

  // TODO
  componentDidMount() {
    const facID = this.props.navigation.getParam('ID', undefined);
    //Alert.alert(orcID)

    fetch(global.serverUrl + '/sales/document/' + facID, global.getOptions)
    .then(response => response.json())
    .then(fatura => {
      console.log(fatura)
      console.log(fatura.header)
      this.setState({
        fatura
      })
    })
  }

   _onPressButton() {
    Alert.alert('fatura #0012023 criada!')
    this.props.navigate('C0003')
    //this.props.navigate()
  }

  _onPressButton2() {
    Alert.alert('Deleted!')
    //this.props.navigate()
  }

  render() {

    const SampleNameArray = ['Tube XDK001', 'TubeLikid 10XX', 'Tube Anico', 'Tube Acid RRC11', 'Combo Tube RR1']
    

    return (
    <View style={styles.container}> 
      <ScrollView style={styles.container, styles.mg_top} contentContainerStyle={styles.contentContainer}>
       <View style={styles.paper}>

        {/* ROW 1 */}
        <View style={styles.rowA}> 

          {/* left Side */}
          <View style={styles.childrenA}>
              <ImageBackground source={require('../assets/images/fat.png')} style={styles.bg}></ImageBackground>
          </View>

          {/* Right Side */}
          <View style={styles.childrenB}>   
            <View style={styles.text}>
              <View style={{marginBottom: 6}}>
                <Text> Company:   </Text>
              </View>
              <View style={{marginBottom: 6}}>
                <Text style={{color: '#85adad'}}> {this.state.fatura.header.Nome} </Text>
              </View>
              

              <View style={{marginBottom: 0, marginTop: 8}}>
                <Text> Inicio:  {this.props.from} </Text>
                <Text style={{marginTop:6, color: '#85adad'}}> {this.state.fatura.header.DataCriacao} </Text>
              </View>
              <View style={{marginTop:6}}>
                <Text> Fim: {this.props.to}</Text>
                <Text style={{marginTop:6, color: '#85adad'}}> {this.state.fatura.header.DataCarga} </Text>
              </View>                   
            </View>
          </View>
        </View>

        <View style={styles.textTitle} style={{marginTop:0}}>
          <Text> Codigo: </Text>
          <Text style={{marginTop:6, color: '#85adad'}}> #2018{this.state.fatura.header.NumDoc} </Text>
        </View>

        <View style={{flexDirection: 'row'}}> 
          <View style={styles.textTitle} style={{marginTop:12, marginBottom: 4, flex:0.5}}>
            <Text> Equipamento: </Text>
          </View>
          <View style={styles.textTitle} style={{marginTop:12, marginBottom: 4, flex:0.5}}>
            <Text> Quantidade: </Text>
          </View>
        </View>    

        {/* Lista de equipamentos */}
        <View style={styles.rawTubos} style={{flexDirection:'column', marginTop: 12, marginLeft:5}}  >
           { this.state.fatura.rows.map((item, key)=>(

            <View key={key} style={{flexDirection: 'row', marginBottom: 10}}>
              <View style={{flex:0.6}}>
                <Text style={{fontWeight: 'bold', color:'#339966', fontSize: 20}}>{item.Descricao}</Text>
              </View>
              <View style={{flex:0.3}}>
                <Text style={{fontWeight: 'bold', color:'#339966', fontSize: 20}}>{item.Quantidade}</Text>
              </View>
            </View>
           )
           )}
           
        </View>

      {/* Preco Total */}
        <View style={styles.textTitle} style={{marginTop: 8}}>
          <Text> Preço Total: </Text>
          <Text style={{marginTop:6, color: '#85adad'}}> {this.state.fatura.header.TotalDocumento}€ </Text>
        </View>

     </View>

     </ScrollView>
        
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding:20,
    paddingBottom:0,
  },
  rawTubos: {
    flexDirection: 'row',
    flex:0.25
  },
  paper: { flex: 1, 
    flexDirection: 'column', 
    backgroundColor: 'white',
    borderRadius: 10,
    padding:16,
  },
  textTitle:{
      marginBottom: 12, 
      fontSize: 12
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
    textAlign: 'center',
    padding:15,
    flex: 0.4, 
    flexDirection: 'row',
    marginBottom: '0%'
  },
    childrenA: {
    marginRight: 15,
    marginBottom:20,
    flex: 0.5,
    flexDirection: 'column',
    padding:2,
  }, 
  childrenB: {
    fontSize: 143,
    margin: 0,
    flex: 1.5,
    padding:0,
    paddingLeft:25,
  },

  bg:{
    flex: 0.8,
    justifyContent: 'center',
    resizeMode:'cover',
    width: 75,
    height:75,
    marginTop: '24%',
    marginLeft:'-20%',
  },
    childrenC: {
    margin: 0,
    flex: 0.3,
    alignItems: 'center',
  },
  loginbtn:{
    color: 'black',
    alignSelf: 'stretch',
    width: 20,
    height:20,
    fontWeight: 'bold',
  }
})

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