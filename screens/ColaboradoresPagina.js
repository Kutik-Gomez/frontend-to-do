import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../styles/colors"; // Importa los colores globales
import { FontAwesome } from '@expo/vector-icons'; // Asegúrate de tener instalada la librería
import ListaCompartidos from "../components/ListaCompartidos"; // Importa la lista de tareas compartidas

export default function ColaboradoresPagina({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Compartidos Tarea</Text>
      </View>
      <View style={styles.content}>
        <ListaCompartidos /> {/* Aquí se muestra la lista de tareas compartidas */}
      </View>
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate("FormularioCompartido")} // Navega a FormularioCompartido
      >
        <FontAwesome name="plus" size={24} color="#ffd230" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBackground, // Usa el color global para el fondo del contenedor
  },
  header: {
    backgroundColor: colors.headerBackground, // Usa el color global para el fondo del encabezado
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ffe85c", // Usa el color global para la línea inferior del encabezado
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.titleColor, // Usa el color global para el texto del título
  },
  content: {
    flex: 1,
    backgroundColor: "#a9cdf9", // Usa el color global para el fondo del contenido
    padding: 16,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 16,
    bottom: 16,
    backgroundColor: '#004d60', // Color azul para el botón flotante, puedes usar un color de tu paleta
    borderRadius: 28,
    elevation: 5, // Sombra en Android
    shadowColor: '#d2daf7', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
