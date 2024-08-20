import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePagina from './components/HomePagina';
import LoginPagina from './components/LoginPagina';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPagina">
        <Stack.Screen name="LoginPagina" component={LoginPagina} />
        <Stack.Screen name="HomePagina" component={HomePagina} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
