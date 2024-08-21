import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/FormularioTareaEstilos"; 
import { FontAwesome } from '@expo/vector-icons';
import { crearCompartido } from "../services/CompartidosServices"; 
import { getToken } from "../services/authService"; 

export default function FormularioCompartido({ navigation }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [prioridad, setPrioridad] = useState("media");
  const [estado, setEstado] = useState("pendiente");
  const [correosColaboradores, setCorreosColaboradores] = useState(""); // Para ingresar los correos separados por comas

  const handleCrearCompartido = async () => {
    try {
      const token = await getToken(); 
      const usuarioId = "Kskw97b9LlSQOKC16txo"; 

      const nuevaCompartido = {
        titulo,
        descripcion,
        fecha_creacion: new Date().toISOString(),
        fecha_vencimiento: fechaVencimiento || null,
        prioridad,
        estado,
        compartida_por: usuarioId,
        compartida_con: correosColaboradores.split(",").map(correo => correo.trim()), // Convierte los correos a un array
      };

      await crearCompartido(nuevaCompartido, token); 
      Alert.alert("Éxito", "Tarea compartida creada exitosamente.");
      navigation.navigate("ColaboradoresPagina"); 
    } catch (error) {
      Alert.alert("Error", "No se pudo crear la tarea compartida. Por favor, intenta nuevamente.");
      console.error("Error al crear la tarea compartida:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={30} color={"#ffef6a"} />
        </TouchableOpacity>
        <Text style={styles.title}>Formulario Compartido</Text>
      </View>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
          placeholderTextColor="#4f3975"
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
          placeholderTextColor="#4f3975"
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de Vencimiento (YYYY-MM-DD)"
          value={fechaVencimiento}
          onChangeText={setFechaVencimiento}
          placeholderTextColor="#4f3975"
        />
        <TextInput
          style={styles.input}
          placeholder="Prioridad (baja, media, alta)"
          value={prioridad}
          onChangeText={setPrioridad}
          placeholderTextColor="#4f3975"
        />
        <TextInput
          style={styles.input}
          placeholder="Estado (pendiente, completada)"
          value={estado}
          onChangeText={setEstado}
          placeholderTextColor="#4f3975"
        />
        <TextInput
          style={styles.input}
          placeholder="Correos de Colaboradores (separados por comas)"
          value={correosColaboradores}
          onChangeText={setCorreosColaboradores}
          placeholderTextColor="#4f3975"
        />
      </View>
      <TouchableOpacity style={styles.fab} onPress={handleCrearCompartido}>
        <Text style={styles.fabText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}
