import { StyleSheet } from 'react-native';
import colors from "./colors"; // Asegúrate de que la ruta sea correcta

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBackground,
  },
  header: {
    backgroundColor: colors.headerBackground,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.headerBorderBottom,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.titleColor,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: colors.contentBackground,
    padding: 16,
  },
  label: {
    fontSize: 16,
    color: colors.titleColor,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#96a7e7', // Color azul suave para el borde del input
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    color: colors.titleColor,
    backgroundColor: '#e2d5ed', // Fondo azul suave para el input
    borderRadius: 5,
  },
  fab: {
    alignSelf: 'center',
    width: 200,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 28,
    marginVertical: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  fabText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
