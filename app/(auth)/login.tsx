import { Link, useRouter } from 'expo-router'; // Importamos useRouter
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

// REMOVIDO: useAuthViewModel

export default function LoginScreen() {
  // 1. Obtenemos el router para la navegación manual
  const router = useRouter();

  const handleLogin = () => {
    // Aquí iría tu lógica de Firebase...
    // al ser exitosa, llamas a router.replace()

    console.log("Simulando login y navegando a (app)...");

    // 2. Usamos router.replace para ir a la ruta (app) y limpiar el historial
    router.replace('/(app)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Button title="Simular Login Exitoso" onPress={handleLogin} />
      <Link href="/(auth)/register" style={styles.link}>
        ¿No tienes cuenta? Regístrate
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (tus estilos)
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  link: { marginTop: 15, color: 'blue' },
});
