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
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.color1,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: colors.color1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: colors.color1,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: colors.color1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: colors.color5,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
