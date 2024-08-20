import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../styles/LoginStyles"; // Importa los estilos
import colors from "../styles/colors"; // Importa los colores globales
import { FontAwesome } from "@expo/vector-icons"; // Para el ícono de login

export default function LoginPagina({ navigation }) {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación
    console.log("Correo:", correo);
    console.log("Clave:", clave);
  };

  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle" size={100} color={colors.color1} style={styles.icon} />
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor={colors.color4}
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Clave"
        placeholderTextColor={colors.color4}
        value={clave}
        onChangeText={setClave}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}
