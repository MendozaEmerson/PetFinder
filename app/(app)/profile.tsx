import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileTab() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil (App)</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24 },
});
