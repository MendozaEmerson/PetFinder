import { useAuthViewModel } from '@/src/viewmodels/authviewmodel';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const { signIn, isLoading } = useAuthViewModel();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
    // Llamamos a Supabase a través del ViewModel
    await signIn(email, pass);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LostPet Finder</Text>
      <Text style={styles.subtitle}>Iniciar Sesión</Text>

      {isLoading ? (
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
            ¿No tienes cuenta? Regístrate aquí
          </Link>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 30, color: '#7f8c8d' },
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
