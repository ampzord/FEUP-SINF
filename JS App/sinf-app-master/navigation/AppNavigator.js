import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
//import LoginScreen from './LoginScreen';

export default createSwitchNavigator(
  {
    Auth: AuthNavigator,
    Main: MainTabNavigator
  },
  {
    initialRouteName: 'Auth', 
  }
);