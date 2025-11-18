import { useAuthViewModel } from '@/src/viewmodels/authviewmodel';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
    const router = useRouter();
    const { signUp, isLoading } = useAuthViewModel();

    // Estado local para el formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        // 1. Llamar a la función de registro del ViewModel
        const success = await signUp(email, password);

        // 2. Si el registro es exitoso (y Supabase no loguea automáticamente),
        // podrías redirigir al login manualmente. 
        // Nota: Si Supabase loguea automáticamente, el _layout lo detectará.
        if (success) {
            console.log("Registro enviado correctamente");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Cuenta</Text>

            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Correo Electrónico</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Mínimo 6 caracteres"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <View style={styles.buttonContainer}>
                        <Button title="Registrarse" onPress={handleRegister} />
                    </View>

                    {/* Botón para volver atrás */}
                    <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
                        <Text style={styles.backText}>¿Ya tienes cuenta? Volver al Login</Text>
                    </TouchableOpacity>
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
    backLink: { marginTop: 20, alignItems: 'center' },
    backText: { color: '#007AFF', fontSize: 16 },
});
