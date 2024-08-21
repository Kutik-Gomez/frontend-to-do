import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/CompartidosEstilos';
import { obtenerCompartidos, actualizarCompartido, eliminarCompartido } from '../services/CompartidosServices';

export default function ListaCompartidos() {
  const [compartidos, setCompartidos] = useState([]);
  const [selectedCompartido, setSelectedCompartido] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editableCompartido, setEditableCompartido] = useState({});

  const cargarCompartidos = async () => {
    try {
      const compartidosObtenidos = await obtenerCompartidos();
      setCompartidos(compartidosObtenidos);
    } catch (error) {
      console.error("Error al cargar las tareas compartidas:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      cargarCompartidos();
    }, [])
  );

  const handleEliminarCompartido = async (id) => {
    try {
      await eliminarCompartido(id);
      setCompartidos(prevCompartidos => prevCompartidos.filter(compartido => compartido.id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea compartida:", error);
    }
  };

  const toggleCompletion = (compartido) => {
    setCompartidos(prevCompartidos =>
      prevCompartidos.map(t =>
        t.id === compartido.id ? { ...t, completada: !t.completada } : t
      )
    );

    setTimeout(() => {
      handleEliminarCompartido(compartido.id);
    }, 500);
  };

  const mostrarDetalles = (compartido) => {
    setSelectedCompartido(compartido);
    setModalVisible(true);
  };

  const mostrarEdicion = (compartido) => {
    setEditableCompartido(compartido);
    setEditModalVisible(true);
  };

  const handleActualizarCompartido = async () => {
    try {
      await actualizarCompartido(editableCompartido.id, editableCompartido);
      setCompartidos(prevCompartidos => prevCompartidos.map(tarea =>
        tarea.id === editableCompartido.id ? editableCompartido : tarea
      ));
      setEditModalVisible(false);
    } catch (error) {
      console.error("Error al actualizar la tarea compartida:", error);
    }
  };

  const getCheckboxColor = (prioridad) => {
    switch (prioridad) {
      case "alta":
        return "#ff4d4d";
      case "media":
        return "#ffa500";
      case "baja":
        return "#32cd32";
      default:
        return "#ccc";
    }
  };

  return (
    <View>
      {compartidos.map(compartido => (
        <View key={compartido.id} style={styles.itemContainer}>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, { backgroundColor: getCheckboxColor(compartido.prioridad) }]}
              onPress={() => toggleCompletion(compartido)}
            >
              {compartido.completada && (
                <FontAwesome name="check" size={16} color="white" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{compartido.titulo}</Text>
            <Text style={styles.description}>{compartido.descripcion}</Text>
          </View>
          <TouchableOpacity style={styles.iconContainer} onPress={() => mostrarDetalles(compartido)}>
            <FontAwesome name="eye" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={() => mostrarEdicion(compartido)}>
            <FontAwesome name="pencil" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      ))}

      {/* Modal para Detalles */}
      {selectedCompartido && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Text style={modalStyles.modalTitle}>{selectedCompartido.titulo}</Text>
              <Text>Descripción: {selectedCompartido.descripcion}</Text>
              <Text>Prioridad: {selectedCompartido.prioridad}</Text>
              <Text>Estado: {selectedCompartido.estado}</Text>
              <Text>Fecha de Creación: {selectedCompartido.fecha_creacion}</Text>
              <Text>Fecha de Vencimiento: {selectedCompartido.fecha_vencimiento || 'No definida'}</Text>
              
              <TouchableOpacity
                style={modalStyles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text style={modalStyles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Modal para Edición */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <TextInput
              style={modalStyles.input}
              value={editableCompartido.titulo}
              onChangeText={(text) => setEditableCompartido({ ...editableCompartido, titulo: text })}
            />
            <TextInput
              style={modalStyles.input}
              value={editableCompartido.descripcion}
              onChangeText={(text) => setEditableCompartido({ ...editableCompartido, descripcion: text })}
            />
            <TextInput
              style={modalStyles.input}
              value={editableCompartido.estado}
              onChangeText={(text) => setEditableCompartido({ ...editableCompartido, estado: text })}
            />
            <TextInput
              style={modalStyles.input}
              placeholder="YYYY-MM-DD"
              value={editableCompartido.fecha_creacion || ''}
              onChangeText={(text) => setEditableCompartido({ ...editableCompartido, fecha_creacion: text })}
            />
            <TextInput
              style={modalStyles.input}
              placeholder="YYYY-MM-DD"
              value={editableCompartido.fecha_vencimiento || ''}
              onChangeText={(text) => setEditableCompartido({ ...editableCompartido, fecha_vencimiento: text })}
            />
            <TouchableOpacity
              style={modalStyles.button}
              onPress={handleActualizarCompartido}
            >
              <Text style={modalStyles.buttonText}>Actualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={modalStyles.button}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={modalStyles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
