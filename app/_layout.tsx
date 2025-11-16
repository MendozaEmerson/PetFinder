import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Lógica para el estilo del StatusBar:
  // Si el tema es 'dark' (fondo oscuro), queremos texto 'light'.
  // Si el tema es 'light' (fondo claro), queremos texto 'dark'.
  const barStyle = colorScheme === 'dark' ? 'light' : 'dark';

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigation />
      <StatusBar style={barStyle} />
    </ThemeProvider>
  );
}

// Componente separado para la navegación
function RootNavigation() {
  // Esta estructura ya es correcta para la navegación manual
  return (
    <Stack>
      {/* 1. Pantalla de Bienvenida (en la raíz) */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* 2. Grupo de Autenticación */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />

      {/* 3. Grupo Principal de la App (Tabs) */}
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
}
