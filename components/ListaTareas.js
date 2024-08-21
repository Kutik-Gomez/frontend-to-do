import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles/ListaEstilos';
import { obtenerTareas, actualizarTarea, eliminarTarea } from '../services/tareasService';

export default function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [selectedTarea, setSelectedTarea] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editableTarea, setEditableTarea] = useState({});

  // Cargar las tareas al inicio
  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const tareasObtenidas = await obtenerTareas();
        setTareas(tareasObtenidas);
      } catch (error) {
        console.error("Error al cargar las tareas:", error);
      }
    };

    cargarTareas();
  }, []);

  // Función para eliminar una tarea
  const handleEliminarTarea = async (id) => {
    try {
      await eliminarTarea(id);
      setTareas(prevTareas => prevTareas.filter(tarea => tarea.id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  // Función para manejar el clic en el checkbox y mostrar el visto antes de eliminar
  const toggleCompletion = (tarea) => {
    setTareas(prevTareas =>
      prevTareas.map(t =>
        t.id === tarea.id ? { ...t, completada: !t.completada } : t
      )
    );

    setTimeout(() => {
      handleEliminarTarea(tarea.id);
    }, 500); // Espera 500ms antes de eliminar la tarea para que se vea el visto
  };

  // Función para mostrar los detalles de una tarea
  const mostrarDetalles = (tarea) => {
    setSelectedTarea(tarea);
    setModalVisible(true);
  };

  // Función para mostrar el modal de edición de una tarea
  const mostrarEdicion = (tarea) => {
    setEditableTarea(tarea);
    setEditModalVisible(true);
  };

  // Función para actualizar la tarea
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

  // Función para obtener el color según la prioridad
  const getCheckboxColor = (prioridad) => {
    switch (prioridad) {
      case "alta":
        return "#ff4d4d"; // Rojo
      case "media":
        return "#ffa500"; // Naranja
      case "baja":
        return "#32cd32"; // Verde
      default:
        return "#ccc"; // Color por defecto (gris)
    }
  };

  return (
    <View>
      {tareas.map(tarea => (
        <View key={tarea.id} style={styles.itemContainer}>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, { backgroundColor: getCheckboxColor(tarea.prioridad) }]}
              onPress={() => toggleCompletion(tarea)} // Muestra el visto antes de eliminar
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
            <FontAwesome name="eye" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={() => mostrarEdicion(tarea)}>
            <FontAwesome name="pencil" size={20} color="#000" />
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
              <Text>Fecha de Creación: {new Date(selectedTarea.fecha_creacion).toLocaleDateString()}</Text>
              <Text>Fecha de Vencimiento: {selectedTarea.fecha_vencimiento ? new Date(selectedTarea.fecha_vencimiento).toLocaleDateString() : 'No definida'}</Text>
              <Text>ID Usuario: {selectedTarea.usuario_id}</Text>
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
