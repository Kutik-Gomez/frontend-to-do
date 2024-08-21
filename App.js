import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPagina from "./screens/loginPagina";
import RegistrarPagina from "./screens/RegistrarPagina";
import Navegacion from "./Navegacion"; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginPagina}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Registrar"
          component={RegistrarPagina}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Navegacion"
          component={Navegacion}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
