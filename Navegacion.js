import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack"; // Importa createStackNavigator
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faUsers, faClock } from '@fortawesome/free-solid-svg-icons';

// Screens
import TareasPagina from "./screens/TareasPagina";
import ColaboradoresPagina from "./screens/ColaboradoresPagina";
import ProximosPagina from "./screens/ProximosPagina";
import FormularioTarea from "./screens/FormularioTarea"; // Importa la pantalla FormularioTarea

// Crear el Stack Navigator
const Stack = createStackNavigator();

function TareasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TareasPagina" 
        component={TareasPagina} 
        options={{ headerShown: false }} // Oculta el header por defecto
      />
      <Stack.Screen 
        name="FormularioTarea" 
        component={FormularioTarea} 
        options={{ headerShown: false }} // Oculta el header por defecto
      />
    </Stack.Navigator>
  );
}

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
        },
      }}
    >
      <Tab.Screen
        name="Tareas"
        component={TareasStack} // Usa TareasStack en lugar de TareasPagina
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
