import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';  // Importa useFocusEffect
import styles from '../styles/ListaEstilos';
import { obtenerTareas, actualizarTarea, eliminarTarea } from '../services/tareasService';

export default function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [selectedTarea, setSelectedTarea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editableTarea, setEditableTarea] = useState({});

  const cargarTareas = async () => {
    try {
      const tareasObtenidas = await obtenerTareas();
      setTareas(tareasObtenidas);
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      cargarTareas(); // Carga las tareas cada vez que la pantalla obtiene el foco
    }, [])
  );

  const handleEliminarTarea = async (id) => {
    try {
      await eliminarTarea(id);
      setTareas(prevTareas => prevTareas.filter(tarea => tarea.id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const toggleCompletion = (tarea) => {
    setTareas(prevTareas =>
      prevTareas.map(t =>
        t.id === tarea.id ? { ...t, completada: !t.completada } : t
      )
    );

    setTimeout(() => {
      handleEliminarTarea(tarea.id);
    }, 500);
  };

  const mostrarDetalles = (tarea) => {
    setSelectedTarea(tarea);
    setModalVisible(true);
  };

  const mostrarEdicion = (tarea) => {
    setEditableTarea(tarea);
    setEditModalVisible(true);
  };

  const handleActualizarTarea = async () => {
    try {
      await actualizarTarea(editableTarea.id, editableTarea);
      setTareas(prevTareas => prevTareas.map(tarea =>
        tarea.id === editableTarea.id ? editableTarea : tarea
      ));
      setEditModalVisible(false);
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  const getCheckboxColor = (prioridad) => {
    switch (prioridad) {
      case "alta":
        return "#ff0f57";
      case "media":
        return "#ff771b";
      case "baja":
        return "#73d432";
      default:
        return "#fff";
    }
  };

  return (
    <View>
      {tareas.map(tarea => (
        <View key={tarea.id} style={styles.itemContainer}>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, { backgroundColor: getCheckboxColor(tarea.prioridad) }]}
              onPress={() => toggleCompletion(tarea)}
            >
              {tarea.completada && (
                <FontAwesome name="check" size={16} color="white" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{tarea.titulo}</Text>
            <Text style={styles.description}>{tarea.descripcion}</Text>
          </View>
          <TouchableOpacity style={styles.iconContainer} onPress={() => mostrarDetalles(tarea)}>
            <FontAwesome name="eye" size={30} color="#002cb5" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={() => mostrarEdicion(tarea)}>
            <FontAwesome name="pencil" size={30} color="#002cb5" />
          </TouchableOpacity>
        </View>
      ))}

      {/* Modal para Detalles */}
      {selectedTarea && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Text style={modalStyles.modalTitle}>{selectedTarea.titulo}</Text>
              <Text>Descripción: {selectedTarea.descripcion}</Text>
              <Text>Prioridad: {selectedTarea.prioridad}</Text>
              <Text>Estado: {selectedTarea.estado}</Text>
              <Text>Fecha de Creación: {selectedTarea.fecha_creacion}</Text>
              <Text>Fecha de Vencimiento: {selectedTarea.fecha_vencimiento || 'No definida'}</Text>
              
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
              value={editableTarea.titulo}
              onChangeText={(text) => setEditableTarea({ ...editableTarea, titulo: text })}
            />
            <TextInput
              style={modalStyles.input}
              value={editableTarea.descripcion}
              onChangeText={(text) => setEditableTarea({ ...editableTarea, descripcion: text })}
            />
            <TextInput
              style={modalStyles.input}
              value={editableTarea.estado}
              onChangeText={(text) => setEditableTarea({ ...editableTarea, estado: text })}
            />
            <TextInput
              style={modalStyles.input}
              placeholder="YYYY-MM-DD"
              value={editableTarea.fecha_creacion || ''}
              onChangeText={(text) => setEditableTarea({ ...editableTarea, fecha_creacion: text })}
            />
            <TextInput
              style={modalStyles.input}
              placeholder="YYYY-MM-DD"
              value={editableTarea.fecha_vencimiento || ''}
              onChangeText={(text) => setEditableTarea({ ...editableTarea, fecha_vencimiento: text })}
            />
            <TouchableOpacity
              style={modalStyles.button}
              onPress={handleActualizarTarea}
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
