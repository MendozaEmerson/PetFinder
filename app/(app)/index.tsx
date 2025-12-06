import { useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
// Importamos el ViewModel limpio
import { PetCard } from '@/components/pet-card';
import { useHomeViewModel } from '@/src/viewmodels/homeviewmodel';

const COLORS = {
  background: '#f8f9fa',
  headerBg: '#fff',
  text: '#2c3e50',
  success: '#4caf50', // Verde para tema de "Encontrados"
  accent: '#FF9500'
};

export default function HomeTab() {
  const router = useRouter();

  // Conexión al ViewModel
  const {
    reports: sightings, // Renombramos la variable para claridad
    isLoading,
    refreshing,
    error,
    searchQuery,
    setSearchQuery,
    onRefresh,
    signOut
  } = useHomeViewModel();

  const handlePetPress = (id: string) => {
    // router.push(`/(app)/sighting-details?id=${id}`);
    console.log("Ver detalle avistamiento:", id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Avistamientos</Text>
          <Text style={styles.subtitle}>Mascotas encontradas cerca</Text>
        </View>
        <TouchableOpacity onPress={() => signOut()} style={styles.logoutButton}>
          <Text style={{ fontSize: 24 }}>🚪</Text>
        </TouchableOpacity>
      </View>

      {/* Buscador */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por zona, descripción..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Error */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Lista */}
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.success} style={styles.loader} />
      ) : (
        <FlatList
          data={sightings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PetCard
              pet={{
                // Adaptamos los datos para PetCard
                id: item.id,
                name: item.name,
                imageUrl: item.imageUrl,
                location: item.location,
                type: item.type,
                status: 'found', // Forzamos el estado visual a "Encontrado"
                createdAt: item.createdAt,
                userId: 'unknown',
              }}
              onPress={() => handlePetPress(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.success]} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {searchQuery ? 'No se encontraron resultados' : 'No hay avistamientos recientes'}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: COLORS.headerBg,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.text },
  subtitle: { fontSize: 14, color: COLORS.success },
  logoutButton: { padding: 8 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: { fontSize: 18, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: COLORS.text },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
  },
  errorText: { color: '#c62828', textAlign: 'center' },
  listContent: { padding: 16, paddingBottom: 32 },
  loader: { marginTop: 100 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { fontSize: 16, color: '#7f8c8d' },
});
