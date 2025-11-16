import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function RegisterScreen() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            {/* Botón para regresar al login */}
            <Button title="Volver a Login" onPress={() => router.back()} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, marginBottom: 20 },
});
