import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faUsers, faClock } from '@fortawesome/free-solid-svg-icons';

// Screens
import TareasPagina from "./screens/TareasPagina";
import ColaboradoresPagina from "./screens/ColaboradoresPagina";
import ProximosPagina from "./screens/ProximosPagina";

// Crear el Tab Navigator
const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator
      initialRouteName="Tareas"
      screenOptions={{
        tabBarActiveTintColor: "#4d409e", // Color para la etiqueta y el ícono cuando está activo
        tabBarInactiveTintColor: "#796fb6", // Color para la etiqueta y el ícono cuando no está activo
        tabBarLabelStyle: {
          fontSize: 15, // Aumenta el tamaño de la etiqueta
          /*fontWeight: 'bold', // Hace la etiqueta en negrita
          fontFamily: 'Source',*/
        },
      }}
    >
      <Tab.Screen
        name="Tareas"
        component={TareasPagina}
        options={{
          tabBarLabel: "Tareas",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faBook} size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Compartidos"
        component={ColaboradoresPagina}
        options={{
          tabBarLabel: "Compartidos",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faUsers} size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Próximos"
        component={ProximosPagina}
        options={{
          tabBarLabel: "Próximos",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faClock} size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTab />
    </NavigationContainer>
  );
}
