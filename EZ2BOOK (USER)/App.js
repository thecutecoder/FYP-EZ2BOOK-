import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import AppStack from './src/navigation/AppStack';
//import MyStack from './src/navigation/MyStack';

function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  
  );
}

export default App;
