import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para almacenar el token
import styles from "../styles/LoginStyles"; // Importa los estilos
import colors from "../styles/colors"; // Importa los colores globales
import { FontAwesome } from "@expo/vector-icons"; // Para el ícono de login
import { loginUsuario } from "../services/authService"; // Importa la función de login

export default function LoginPagina({ navigation }) {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { token, success, error } = await loginUsuario(correo, clave);

    if (success) {
      await AsyncStorage.setItem("token", token); // Almacena el token en AsyncStorage
      navigation.replace("Home"); // Navega a la pantalla principal
    } else {
      Alert.alert("Error de Autenticación", error);
    }
    setLoading(false);
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
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? "Ingresando..." : "Ingresar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
