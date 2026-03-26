import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Tontine Natt</Text>
      <Text style={styles.sous}>Bienvenue !</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C47FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titre: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  sous: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
  },
});
