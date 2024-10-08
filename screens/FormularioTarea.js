import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Picker } from "react-native-ui-lib"; // Importar Picker
import styles from "../styles/FormularioTareaEstilos"; // Asegúrate de que la ruta sea correcta
import { FontAwesome } from '@expo/vector-icons';
import { crearTarea } from "../services/tareasService"; // Importar la función para crear tareas
import { getToken } from "../services/authService"; // Importar la función para obtener el token
import colors from "../styles/colors";

export default function FormularioTarea({ navigation }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  
  const [prioridad, setPrioridad] = useState("media");
  const [estado, setEstado] = useState("pendiente");

  const handleCrearTarea = async () => {
    try {
      const token = await getToken(); // Obtener el token del usuario
      const usuarioId = "Zdyytjwg0hvebyBK1tnb"; // Aquí debes usar el ID del usuario autenticado

      const nuevaTarea = {
        titulo,
        descripcion,
        fecha_vencimiento: fechaVencimiento || null,
        prioridad,
        estado,
        usuario_id: usuarioId,
      };

      await crearTarea(nuevaTarea, token); // Crear la tarea
      Alert.alert("Éxito", "Tarea creada exitosamente.");
      navigation.navigate("TareasPagina"); // Redirigir a TareasPagina.js con la lista actualizada
    } catch (error) {
      Alert.alert("Error", "No se pudo crear la tarea. Por favor, intenta nuevamente.");
      console.error("Error al crear la tarea:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={30} color={"#ffef6a"} />
        </TouchableOpacity>
        <Text style={styles.title}>Formulario Tarea</Text>
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

        {/* Combo Box para Prioridad */}
        <Text style={styles.label}>Prioridad:</Text>
        <Picker
          value={prioridad}
          placeholder="Selecciona la prioridad"
          onChange={(item) => setPrioridad(item)}
          style={styles.input}
          topBarProps={{ title: 'Selecciona la prioridad' }}
        >
          <Picker.Item label="Baja" value="baja" />
          <Picker.Item label="Media" value="media" />
          <Picker.Item label="Alta" value="alta" />
        </Picker>

        {/* Combo Box para Estado */}
        <Text style={styles.label}>Estado:</Text>
        <Picker
          value={estado}
          placeholder="Selecciona el estado"
          onChange={(item) => setEstado(item)}
          style={styles.input}
          topBarProps={{ title: 'Selecciona el estado' }}
        >
          <Picker.Item label="Pendiente" value="pendiente" />
          <Picker.Item label="Completada" value="completada" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.fab} onPress={handleCrearTarea}>
        <Text style={styles.fabText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}
