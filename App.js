import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPagina from "./screens/loginPagina"; // Ruta correcta a LoginPagina
import Navegacion from "./Navegacion"; // Importa tu archivo de navegación principal

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginPagina}
          options={{ headerShown: false }} // Oculta el encabezado por defecto
        />
        <Stack.Screen
          name="Navegacion" // Nombre del stack screen que conecta con Navegacion.js
          component={Navegacion}
          options={{ headerShown: false }} // Oculta el encabezado por defecto
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
