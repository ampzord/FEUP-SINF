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
import _ from 'lodash'
import utils from '../utils'
import VisitaProfileForm from '../components/VisitaProfileForm'; 
import { PieChart, ProgressCircle, StackedBarChart } from 'react-native-svg-charts'
import moment from 'moment'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Dashboard',
  };

  constructor(props) {
    super(props);
    this.navigateToVisit = this.navigateToVisit.bind(this)
  }

  state = {
    user: {},
    visits: [],
    stats: {
      total: {},
      clients: [],
      lastDays: [],
      lastDocs: []
    }
  }

  navigateToVisit(visitID) {
    this.props.navigation.navigate('VisitaScreen', { visitID })
  }

  componentDidMount() {
    fetch(`${global.serverUrl}/sales/stats`, global.getOptions)
    .then(response => response.json())
    .then(stats => {
      console.log(stats)
      this.setState({
        stats
      })
    })

    fetch(`${global.serverUrl}/current_user`, global.getOptions)
    .then(response => response.json())
    .then(user => {
      console.log(user)
      this.setState({
        user
      })
    })

    fetch(`${global.serverUrl}/agenda?today=true`, global.getOptions)
    .then(response => response.json())
    .then(visits => {
      console.log(visits)
      visits = _.sortBy(visits, [o => { return moment(o.visit_date).isBefore(moment()) ? -1 : 1 }])
      this.setState({
        visits
      })
    })
  }

  _pieData() {
    return _.map(this.state.stats.clients, (stat, index) => {
      return { value: stat.Total, key: index, svg: { fill: utils.randomColor() } }
    })
  }

  render() {
    const resizeMode = 'center';
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.header}>
            <Image
              style={{
                flex: 1,
                
              }}
              source={require('../assets/images/wp.png')}
            />
          </View>
 
          <Image style={styles.avatar} source={require('../assets/images/u1.png')}/>
          
          <View style={styles.bodyText}>
            <View style={styles.bodyContent}>   
              <Text style={styles.name}>{this.state.user.name}</Text>
              <Text style={styles.info}>{this.state.user.username}</Text>
            </View>
          </View>
          
          <View style={styles.rowB}>
            <View style={styles.title}>
                <Text style={{color:'black'}}> Visitas </Text>
            </View>

            <View style={{height: 108 }}>
              <ScrollView horizontal="true">
                {
                  this.state.visits.length == 0 ?
                  <Text>Nenhuma visita agendada.</Text> :
                  this.state.visits.map(visita => {
                    return (       
                      <VisitaProfileForm
                        key={visita.id}
                        url={require('../assets/images/v1.png')}
                        visitKey={visita.id}
                        company={`#${visita.id} - ${visita.client_name}`}
                        local={visita.client_address}
                        date={visita.visit_date}
                        navigate={this.navigateToVisit}
                      />
                    )
                  })
                }  
              </ScrollView>

            </View>
          </View>

          <View style={styles.rowB}>
            <View style={styles.title}>
                <Text style={{color:'black'}}> Progresso </Text>
            </View>

            <View>
              <ProgressCircle
                style={{ height: 100 }}
                progress={this.state.stats.total.Total / 100000}
                progressColor={'#32BDA6'}
              />
            </View>
          </View>

          {/* ROW 1 */}
          <View style={styles.rowA}> 
            {/* left Side */}
            <View style={styles.rowA_children}>
              <View style={styles.title}>
                <Text style={{color:'black'}}>Melhores Clientes</Text>
              </View>

              <View> 
                <PieChart
                  style={{ height: 200, padding: 10 }}
                  data={this._pieData()}
                />
            </View>
          </View>

          {/* Right Side */}
          <View style={styles.rowA_children}>
           <View style={styles.title}>
              <Text style={{color:'black'}}>Últimos Dias</Text>
            </View>

            <View>
              <StackedBarChart
                style={{ height: 200, padding: 10 }}
                keys={['Total']}
                colors={['#32BDA6', '#65D6C4', '#00CC66', '#FF3399', '#A0A0A0', '#FF8000', '#9999FF']}
                data={this.state.stats.lastDays}
                contentInset={{ top: 30, bottom: 30 }}
              />
            </View>
          </View>
        </View>

        {/* ROW 2 */}
        <View style={styles.rowB}>
          <View style={styles.title}>
              <Text style={{color:'black'}}> Documentos nos últimos dias </Text>
          </View>

          <View>
            <StackedBarChart
              style={{ height: 200, padding: 10, marginBottom: 30 }}
              keys={['ContagemOrc', 'ContagemEnc']}
              colors={['#32BDA6', '#65D6C4', '#00CC66', '#FF3399', '#A0A0A0', '#FF8000', '#9999FF']}
              data={this.state.stats.lastDocs}
              contentInset={{ top: 30, bottom: 30 }}
            />
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
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  header:{
    backgroundColor: "#008060",
    opacity:0.85,
    height:200,
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
    marginTop:130,
    borderColor: '#404040'
  },
  name:{
    fontSize:24,
    color:"black",
    fontWeight:'600',
  },
  bodyText:{
    marginTop:60,
    backgroundColor: 'white',
    height:'5%'
  },
  bodyChart:{
    marginTop:5,
    backgroundColor: 'white'
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:10,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:18,
    color: "#26734d",
    opacity: 0.7,
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
    backgroundColor: 'white',
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