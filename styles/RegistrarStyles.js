import { StyleSheet } from "react-native";
import colors from "./colors"; // Importa los colores globales

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.containerBackground,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40, // ajusta según sea necesario
    left: 16, // ajusta según sea necesario
    zIndex: 1,
    
  },
  icon: {
    marginBottom: 20,
    color: "#0c0787",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0c0787",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#0c0787",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: "#065ad3",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#0c0787",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fffffe",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: colors.color1,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#065ad3",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fffffe",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
