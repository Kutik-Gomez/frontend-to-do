import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBook, faUsers, faClock } from '@fortawesome/free-solid-svg-icons';

// Screens
import TareasPagina from "./screens/TareasPagina";
import ColaboradoresPagina from "./screens/ColaboradoresPagina";
import ProximosPagina from "./screens/ProximosPagina";
import FormularioTarea from "./screens/FormularioTarea"; 
import FormularioCompartido from "./screens/FormularioCompartido"; 

// Crear el Stack Navigator para Tareas
const TareasStack = createStackNavigator();

function TareasStackNavigator() {
  return (
    <TareasStack.Navigator>
      <TareasStack.Screen 
        name="TareasPagina" 
        component={TareasPagina} 
        options={{ headerShown: false }} 
      />
      <TareasStack.Screen 
        name="FormularioTarea" 
        component={FormularioTarea} 
        options={{ headerShown: false }} 
      />
    </TareasStack.Navigator>
  );
}

// Crear el Stack Navigator para Colaboradores
const ColaboradoresStack = createStackNavigator();

function ColaboradoresStackNavigator() {
  return (
    <ColaboradoresStack.Navigator>
      <ColaboradoresStack.Screen 
        name="ColaboradoresPagina" 
        component={ColaboradoresPagina} 
        options={{ headerShown: false }} 
      />
      <ColaboradoresStack.Screen 
        name="FormularioCompartido" 
        component={FormularioCompartido} 
        options={{ headerShown: false }} 
      />
    </ColaboradoresStack.Navigator>
  );
}

// Crear el Tab Navigator
const Tab = createBottomTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator
      initialRouteName="Tareas"
      screenOptions={{
        tabBarActiveTintColor: "#4d409e", 
        tabBarInactiveTintColor: "#796fb6", 
        tabBarLabelStyle: {
          fontSize: 15, 
        },
      }}
    >
      <Tab.Screen
        name="Tareas"
        component={TareasStackNavigator} 
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
        component={ColaboradoresStackNavigator} 
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

// Modificación aquí: Envuelve todo dentro de un `NavigationContainer`
export default function Navigation() {
  return (
    <NavigationContainer independent={true}> {/* Añadido `independent={true}` para evitar conflictos */}
      <MyTab />
    </NavigationContainer>
  );
}
