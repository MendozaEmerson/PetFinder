import { Link } from 'expo-router'; // Solo usamos Link
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a LostPet Finder</Text>

      {/* El componente Link navega manualmente a la ruta (auth)/login */}
      <Link href="/(auth)/login" asChild>
        <Button title="Ir a Iniciar Sesión" />
      </Link>
      <Link href="/(auth)/register" asChild>
        <Button title="Registrarse" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
