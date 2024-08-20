import React from "react";
import { View, Text, StyleSheet } from "react-native";


export default function TareasPagina() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tareas</Text>
      </View>
      <View style={styles.content}>
        {/* Aquí puedes agregar el contenido de la página */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Usa todo el espacio disponible
    backgroundColor: '#e8e8e8', // Color gris claro para el fondo del contenido
  },
  header: {
    backgroundColor: '#fff', // Fondo blanco para el encabezado
    paddingHorizontal: 16,
    paddingVertical: 20, // Ajusta la altura del encabezado
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc', // Líneas sutiles entre el encabezado y el contenido
  },
  title: {
    fontSize: 28, // Tamaño del título más grande
    fontWeight: 'bold', // Texto en negrita
    color: 'black', // Color del texto negro
    
  },
  content: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Fondo del contenido, más oscuro que el encabezado
    padding: 16,
  },
});
