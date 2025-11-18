import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';

// 1. Importar el Hook del ViewModel
import { useAuthViewModel } from '@/src/viewmodels/authviewmodel';

export default function LoginScreen() {
  // 2. Consumir el ViewModel para obtener la función y el estado
  const { signIn, isLoading } = useAuthViewModel();

  // Estado local para controlar los inputs del formulario
  const [email, setEmail] = useState('test@user.com'); // Valor por defecto para pruebas
  const [pass, setPass] = useState('123456');

  const handleLogin = async () => {
    // 3. Llamar a la lógica de negocio del ViewModel
    // NOTA: No usamos router.replace() aquí. 
    // La redirección es automática gracias al 'Guardián' en app/_layout.tsx
    await signIn(email, pass);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      {isLoading ? (
        // Mostrar indicador de carga si el ViewModel está trabajando
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Ingresa tu correo"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={pass}
            onChangeText={setPass}
            secureTextEntry
            placeholder="Ingresa tu contraseña"
          />

          <View style={styles.buttonContainer}>
            <Button title="Entrar" onPress={handleLogin} />
          </View>

          <Link href="/(auth)/register" style={styles.link}>
            ¿No tienes cuenta? Regístrate
          </Link>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, marginBottom: 30, fontWeight: 'bold', color: '#333' },
  formContainer: { width: '100%' },
  label: { marginBottom: 8, color: '#555', fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#f9f9f9'
  },
  buttonContainer: { marginTop: 10 },
  link: { marginTop: 25, color: '#007AFF', textAlign: 'center', fontSize: 16 },
});
