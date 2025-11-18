import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';

// 1. Importar el Proveedor y el Hook del ViewModel
import { AuthProvider, useAuthViewModel } from '@/src/viewmodels/authviewmodel';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    // 2. Envolver TODA la aplicación con el AuthProvider
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootNavigation />
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>
    </AuthProvider>
  );
}

// Componente interno para manejar la navegación y el consumo del hook
function RootNavigation() {
  // 3. Consumir el ViewModel para obtener el estado
  const { isAuthenticated, isLoading } = useAuthViewModel();
  const router = useRouter();

  // CORRECCIÓN: Forzamos el tipo a string[] para evitar el error de TypeScript 
  // que piensa que segments.length nunca puede ser 0.
  const segments = useSegments() as string[];

  // 4. Lógica de Redirección (El Guardián)
  React.useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inAppGroup = segments[0] === '(app)';

    if (!isAuthenticated && inAppGroup) {
      // CASO 1: No está logueado, pero intenta entrar a la App
      // CORRECCIÓN: La ruta raíz es '/' (no '/index')
      router.replace('/');
    } else if (isAuthenticated && (segments.length === 0 || inAuthGroup || segments[0] === 'index')) {
      // CASO 2: Ya está logueado, pero está en Login, Registro o Bienvenida
      // (Al usar 'as string[]', podemos verificar length === 0 o 'index' sin errores)
      router.replace('/(app)');
    }

  }, [isAuthenticated, isLoading, segments, router]);

  // 5. Mostrar pantalla de carga
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // 6. Definir la estructura de navegación
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
}
