import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../styles/colors"; // Importa los colores globales
import { FontAwesome } from '@expo/vector-icons';
import ListaTareas from "../components/ListaTareas"; // Importa el componente ListaTareas

export default function TareasPagina({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tareas</Text>
      </View>
      <View style={styles.content}>
        <ListaTareas /> {/* Usa el componente ListaTareas */}
      </View>
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate("FormularioTarea")} 
      >
        <FontAwesome name="plus" size={24} color="#ffff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBackground,
  },
  header: {
    backgroundColor: colors.headerBackground,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#00fdff",
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: colors.titleColor,
  },
  content: {
    flex: 1,
    backgroundColor: "#a9cdf9",
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
    backgroundColor: '#e44215',
    borderRadius: 28,
    elevation: 5,
    shadowColor: '#0c0787',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
