import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeTab() {
  // 1. Obtenemos el router
  const router = useRouter();

  const handleLogout = () => {
    console.log("Cerrando sesión y navegando a / (Bienvenida)");

    // 2. Usamos router.replace para volver a la pantalla de bienvenida
    router.replace('../');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home (App)</Text>
      <Text>¡Estás "autenticado"!</Text>
      <Button title="Cerrar Sesión (Sign Out)" onPress={handleLogout} />
    </View>
  );
}
const styles = StyleSheet.create({
  // ... (tus estilos)
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
