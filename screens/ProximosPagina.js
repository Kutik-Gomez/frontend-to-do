import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors"; // Importa los colores globales

export default function TareasPagina() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Próximos</Text>
      </View>
      <View style={styles.content}>
        {/* Aquí puedes agregar el contenido de la página */}
      </View>
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
});
