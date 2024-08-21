import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../styles/colors";
import styles from "../styles/RegistrarStyles"; // Importa los estilos

export default function RegistrarPagina({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleRegistrar = async () => {
    try {
      const response = await fetch("http://localhost:3535/api/usuarios/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, correo, clave }),
      });

      if (response.ok) {
        setModalVisible(true); // Muestra el modal de éxito
      } else {
        alert("Error al crear el usuario.");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <FontAwesome name="user-plus" size={100} color={colors.color1} style={styles.icon} />
      <Text style={styles.title}>Registrar Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor={colors.color4}
        value={nombre}
        onChangeText={setNombre}
      />
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
      <TouchableOpacity style={styles.button} onPress={handleRegistrar}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Usuario creado exitosamente.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
