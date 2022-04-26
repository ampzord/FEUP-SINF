import React from 'react';
import { StyleSheet,Alert,TouchableHighlight, Text,Button,TextInput,Image, View,ScrollView,ImageBackground,FloatingAction } from 'react-native';
import ListItems from '../components/ListItems';
import _ from 'lodash'
import ProductForm from '../components/ProductForm'; 
import Btn from '../components/Btn';
import RNPickerSelect from 'react-native-picker-select';

export default class CreateEncomendaScreen extends React.Component {
  static navigationOptions = {
    title: 'Encomenda',
  };

  constructor(props) {
    super(props);
  }

   state = {
            pickedClient: undefined,
            clientes: [],
            equipamentos: [],
            rows: []
        };

   _onPressButton() {
    fetch(global.serverUrl + '/sales/orders', {
      ...global.postOptions,
      body: JSON.stringify({
        client_id: this.state.pickedClient,
        rows: this.state.rows
      })
    })
    .then(response => {
      if (response.status === 200) {
        Alert.alert('Encomenda criada!')
        let reload = this.props.navigation.getParam('reload', () => {})
        reload()
        this.props.navigation.navigate('EncomendaList')
      } else {
        Alert.alert('Ocorreu um erro a criar o documento...')
      }
    })

    //console.log(this.state.rows);
    //this.props.navigation.navigate('Orcamento', { Orc: "C0003" })
    
    //this.props.navigate()
  }

  _onPressButton2() {
    Alert.alert('Deleted!')
    //this.props.navigate()
  }

  clientListConvert(){
    return _.map(this.state.clientes,cliente=>{
      return {label: cliente.Nome, value: cliente.Cliente, key: cliente.Cliente}
    })
  }

  equipamentoListConvert(){
    return _.map(this.state.equipamentos,equipamento=>{
      return {label: equipamento.Descricao, value: equipamento, key: equipamento.Artigo}
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

    //Get all Products
    fetch(global.serverUrl + '/products', global.getOptions)
    .then(response => response.json())
    .then(equipamentos => {
        console.log(equipamentos)
        this.setState({
          equipamentos
        })
      })
  }

  render() {
    return (
    <View style={styles.container}> 
      <ScrollView style={styles.container, styles.mg_top} contentContainerStyle={styles.contentContainer}>
       <View style={styles.paper}>

        {/* ROW 1 */}
        <View style={styles.rowA}> 

          {/* left Side */}
          <View style={styles.childrenA}>
              <ImageBackground source={require('../assets/images/enc.png')} style={styles.bg}>     
              </ImageBackground>
          </View>

          {/* Right Side */}
          <View style={styles.childrenB}>   
            <View style={styles.text}>
              <View style={{marginBottom: 6}}>
                <Text> Empresa:  </Text>
              </View>
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
          </View>
        </View>

        <View style={styles.textTitle} style={{marginTop:12, marginBottom: 4}}>
          <Text> Equipamento: </Text>
        </View>        

        {/* btn to add equipamento */}
        <View style={styles.rawTubos} >
          
          <View style={{flex:0.5, padding: 5}} >
            <RNPickerSelect 
                    placeholder={{ label: 'Equipamento...', key: 'equipamento_00' }}
                    items={this.equipamentoListConvert()}
                    onValueChange={(value) => {
                        this.setState({
                            favColor: value,
                            rows: [...this.state.rows, { product_id: value.Artigo, productName: value.Descricao, qtt: 0 }]
                        });
                    }}
                    onUpArrow={() => {
                        this.inputRefs.name.focus();
                    }}
                    onDownArrow={() => {
                        this.inputRefs.picker2.togglePicker();
                    }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.favColor}       
              />
          </View>
        </View>

        {/* Lista de equipamentos */}
        <View style={styles.rawTubos} style={{flexDirection:'column', marginTop: 16, marginLeft:5}}  >
          {
            this.state.rows.map((row, index) => {
              return (
                <View  key={index} style={{flexDirection:'row'}}>
                  <View style={{flex:0.6}}>
                    <Text style={{fontFamily: 'Cochin',fontWeight: 'bold', color:'#008060', fontSize: 22}}>{row.productName + "\n"}</Text>
                  </View>
                  <View style={{flex:0.3}}>
                    <TextInput 
                      underLineColerAndroid=''
                      placeholder='Number'
                      style={{color: '#85adad',fontSize: 22}}
                      onChangeText={(text) => {
                        const newRows = [...this.state.rows]
                        newRows[index].qtt = Number(text)
                        this.setState({ rows: newRows })
                      }}
                    />
                  </View>
                  <View style={{flex:0.2,marginBottom:0, padding:0}} >
                    <Button style={{marginBottom:0, fontSize: 22}}
                      onPress={() => { this.setState({ rows: [...this.state.rows].splice(index, 1) }) }}
                      title="x"
                      color="grey"
                      accessibilityLabel="x"
                    />
                  </View>
                </View> 

              )
            })
          }      
        </View>

        <TouchableHighlight 
                style ={{
                    height: 40,
                    width:160,
                    borderRadius:10,
                    backgroundColor : "#f2f2f2",
                    marginLeft :5,
                    marginRight:40,
                    marginTop :20,
                    marginBottom: 20,
                }}>
            <Button onPress={this._onPressButton.bind(this)}            
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
  },
    childrenA: {
    fontSize: 143,
    marginRight: 35,
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
    width: 70,
    height:70,
    marginTop: '10%',
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