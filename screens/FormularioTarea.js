import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';  // Importamos Picker
import styles from "../styles/FormularioTareaEstilos"; // Asegúrate de que la ruta sea correcta
import { FontAwesome } from '@expo/vector-icons';
import { crearTarea } from "../services/tareasService"; // Importar la función para crear tareas
import { getToken } from "../services/authService"; // Importar la función para obtener el token

export default function FormularioTarea({ navigation }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [prioridad, setPrioridad] = useState("media"); // Valor predeterminado
  const [estado, setEstado] = useState("pendiente"); // Valor predeterminado

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
          <FontAwesome name="arrow-left" size={24} color={styles.titleColor} />
        </TouchableOpacity>
        <Text style={styles.title}>Formulario Tarea</Text>
      </View>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
          placeholderTextColor="#96a7e7" // Color del texto del placeholder
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
          placeholderTextColor="#96a7e7"
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de Vencimiento (YYYY-MM-DD)"
          value={fechaVencimiento}
          onChangeText={setFechaVencimiento}
          placeholderTextColor="#96a7e7"
        />

        {/* Picker para Prioridad */}
        <Text style={styles.label}>Prioridad</Text>
        <Picker
          selectedValue={prioridad}
          style={styles.input}
          onValueChange={(itemValue) => setPrioridad(itemValue)}
        >
          <Picker.Item label="Baja" value="baja" />
          <Picker.Item label="Media" value="media" />
          <Picker.Item label="Alta" value="alta" />
        </Picker>

        {/* Picker para Estado */}
        <Text style={styles.label}>Estado</Text>
        <Picker
          selectedValue={estado}
          style={styles.input}
          onValueChange={(itemValue) => setEstado(itemValue)}
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
