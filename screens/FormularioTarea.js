import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../styles/colors"; // Importa los colores globales
import { FontAwesome } from '@expo/vector-icons'; // Asegúrate de tener instalada la librería

export default function FormularioTarea({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={24} color={colors.titleColor} />
        </TouchableOpacity>
        <Text style={styles.title}>Formulario Tarea</Text>
      </View>
      <View style={styles.content}>
        {/* Aquí puedes agregar el contenido del formulario */}
      </View>
      <TouchableOpacity style={styles.fab} onPress={() => {/* Acción del botón */}}>
        <Text style={styles.fabText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBackground, // Color de fondo
  },
  header: {
    backgroundColor: colors.headerBackground, // Fondo del encabezado
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.headerBorderBottom, // Línea inferior del encabezado
    flexDirection: 'row', // Pone el botón de regreso y el título en una fila
    alignItems: 'center',
    justifyContent: 'center', // Centra el contenido horizontalmente
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  title: {
    fontSize: 24, // Tamaño del título
    fontWeight: 'bold',
    color: colors.titleColor, // Color del título
    textAlign: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: colors.contentBackground, // Fondo del contenido
    padding: 16,
  },
  fab: {
    alignSelf: 'center',
    width: 200,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff', // Color del botón
    borderRadius: 28,
    marginVertical: 16,
    elevation: 5, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  fabText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
