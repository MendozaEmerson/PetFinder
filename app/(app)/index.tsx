import React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';

// 1. Importamos el Hook del ViewModel
import { useAuthViewModel } from '@/src/viewmodels/authviewmodel';

export default function HomeTab() {
  // 2. ELIMINAMOS 'useRouter'. Ya no lo necesitamos aquí.
  // const router = useRouter(); 

  // 3. Consumimos el estado y la función del ViewModel
  const { signOut, isLoading } = useAuthViewModel();

  const handleLogout = async () => {
    console.log("Solicitando cierre de sesión al ViewModel...");

    // 4. Llamamos a la acción del negocio.
    // NO navegamos manualmente. El cambio de estado (isAuthenticated = false)
    // disparará automáticamente la redirección en app/_layout.tsx
    await signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home (App)</Text>
      <Text style={{ marginBottom: 20 }}>¡Estás autenticado!</Text>

      {/* 5. Usamos isLoading para dar feedback visual */}
      {isLoading ? (
        <ActivityIndicator color="blue" />
      ) : (
        <Button
          title="Cerrar Sesión (Sign Out)"
          onPress={handleLogout}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
});
