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
    backgroundColor: "#a9cdf9",
    padding: 16,
  },
  label: {
    fontSize: 18,
    color: "#4f3975",
    marginBottom: 8,
  },
  input: {
    width: '100%',
    borderColor: '#00107b',
    marginBottom: 10,
    padding: 20,
    fontSize: 18,
    color: "#4f3975",
    backgroundColor: '#ffef6a',
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
    shadowColor: '#84caff',
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
