import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import OrcamentoListScreen from '../screens/OrcamentoListScreen';
import ClientListScreen from '../screens/ClientListScreen';
import CreateCliente from '../screens/CreateClienteScreen';
import ClientProfileScreen from '../screens/ClientProfileScreen';
import ProductListScreen from '../screens/ProductListScreen';
import CreteOrc from '../screens/CreateOrcScreen'; 
import ProductScreen from '../screens/ProductScreen'; 
import OrcScreen from '../screens/OrcamentoScreen';
import VisitasListScreen from '../screens/VisitasListScreen';
import VisitaScreen from '../screens/VisitaScreen';
import CreateVisitaScreen from '../screens/CreateVisitaScreen';
import FaturaListScreen from '../screens/FaturaListScreen';
import CreateFaturaScreen from '../screens/CreateFaturaScreen';
import FaturaScreen from '../screens/FaturaScreen';
import EncomendaListScreen from '../screens/EncomendaListScreen';
import EncomendaScreen from '../screens/EncomendaScreen';
import CreateEncomendaScreen from '../screens/CreateEncomendaScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  drawerLabel: 'Dashboard',
  drawerIcon: ({ tintColor }) => (
    <TabBarIcon
      focused={false}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
      style={[styles.icon, { tintColor: tintColor }]}
    />
  )
};

const OrcamentoStack = createStackNavigator({
  Orcamento: OrcamentoListScreen,
  CreteOrc: CreteOrc,
  OrcScreen: OrcScreen,
});

OrcamentoStack.navigationOptions = {
  drawerLabel: 'Orçamentos',
  drawerIcon: ({ tintColor }) => (
    <TabBarIcon
      focused={false}
      name={Platform.OS === 'ios' ? 'ios-document' : 'md-document'}
      style={[styles.icon, { tintColor: tintColor }]}
    />
  )
};

const VisitasStack = createStackNavigator({
  Visitas: VisitasListScreen,
  VisitaScreen: VisitaScreen,
  CreateVisita: CreateVisitaScreen
});

VisitasStack.navigationOptions = {
  drawerLabel: 'Visitas',
  drawerIcon: ({ tintColor }) => (
    <TabBarIcon
      focused={false} 
      name={Platform.OS === 'ios' ? 'ios-navigate' : 'md-navigate'}
      style={[styles.icon, { tintColor: tintColor }]}
    />
  )
};

const FaturaStack = createStackNavigator({
  FaturaList: FaturaListScreen,
  FaturaScreen: FaturaScreen,
  CreateFatura: CreateFaturaScreen
});

FaturaStack.navigationOptions = {
  drawerLabel: 'Faturas',
  drawerIcon: ({ tintColor }) => (
    <TabBarIcon
      focused={false}
      name={Platform.OS === 'ios' ? 'ios-cash' : 'md-cash'}
      style={[styles.icon, { tintColor: tintColor }]}
    />
  )
};

const ClientListStack = createStackNavigator({
  ClientList: ClientListScreen,
  ClientProfile: ClientProfileScreen,
  CreateCliente: CreateCliente
});

ClientListStack.navigationOptions = {
  drawerLabel: 'Clientes',
  drawerIcon: ({ tintColor }) => (
    <TabBarIcon
      focused={false}
      name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
      style={[styles.icon, { tintColor: tintColor }]}
    />
  )
};

const ProductListStack = createStackNavigator({
  ProductList: ProductListScreen,
  ProductScreen: ProductScreen
});

ProductListStack.navigationOptions = {
  drawerLabel: 'Produtos',
  drawerIcon: ({ tintColor }) => (
    <TabBarIcon
      focused={false}
      name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
      style={[styles.icon, { tintColor: tintColor }]}
    />
  )
};

const EncomendaListStack = createStackNavigator({
  EncomendaList: EncomendaListScreen,
  EncomendaScreen: EncomendaScreen,
  CreateEncomenda: CreateEncomendaScreen,
  CreateFaturaScreen: CreateFaturaScreen
});

EncomendaListStack.navigationOptions = {
  drawerLabel: 'Encomenda',
  drawerIcon: ({ tintColor }) => (
    <TabBarIcon
      focused={false}
      name={Platform.OS === 'ios' ? 'ios-cube' : 'md-cube'}
      style={[styles.icon, { tintColor: tintColor }]}
    />
  )
}; 

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default createDrawerNavigator({
  HomeStack,
  ClientListStack,
  ProductListStack,
  OrcamentoStack,
  EncomendaListStack,  
  FaturaStack,
  VisitasStack,
});
