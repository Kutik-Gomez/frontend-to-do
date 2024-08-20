import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../styles/colors"; // Importa los colores globales
import { FontAwesome } from '@expo/vector-icons'; // Asegúrate de tener instalada la librería

export default function TareasPagina({ navigation }) { // Añade navigation como prop
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tareas</Text>
      </View>
      <View style={styles.content}>
        {/* Aquí puedes agregar el contenido de la página */}
      </View>
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate("FormularioTarea")} // Navega a FormularioTarea
      >
        <FontAwesome name="plus" size={24} color="white" />
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
    borderBottomColor: colors.headerBorderBottom, // Usa el color global para la línea inferior del encabezado
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.titleColor, // Usa el color global para el texto del título
  },
  content: {
    flex: 1,
    backgroundColor: colors.contentBackground, // Usa el color global para el fondo del contenido
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
    backgroundColor: '#007bff', // Color azul para el botón flotante, puedes usar un color de tu paleta
    borderRadius: 28,
    elevation: 5, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
