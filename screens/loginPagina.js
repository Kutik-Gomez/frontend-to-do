import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/LoginStyles"; 
import colors from "../styles/colors"; 
import { FontAwesome } from "@expo/vector-icons"; 
import { loginUsuario } from "../services/authService"; 

export default function LoginPagina({ navigation }) {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { success, error } = await loginUsuario(correo, clave);

    if (success) {
      navigation.replace("Navegacion"); // Redirige a la pantalla principal
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
      
      {/* Enlace para registrar */}
      <TouchableOpacity onPress={() => navigation.navigate("Registrar")}>
      <Text style={[styles.registerText, { fontSize: 17 }]}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}
