import { AuthViewModel } from '@/src/models/authmodel';
import React, { createContext, useContext, useEffect, useState } from 'react';

// --- Importa tu servicio real de Firebase/Supabase aquí ---
// EJ: import { auth } from '@/src/services/FirebaseConfig';
// EJ: import { onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';

// --- Creación del Contexto ---
const AuthContext = createContext<AuthViewModel | undefined>(undefined);

// --- El Proveedor (ViewModel - VM) ---
export function AuthProvider({ children }: { children: React.ReactNode }) {

    // --- Estado Interno del ViewModel ---
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Empezar cargando
    // Opcional: puedes añadir el estado del usuario si lo necesitas globalmente
    // const [user, setUser] = useState<any>(null); // Reemplaza 'any' con tu tipo de Usuario

    // --- Lógica de Arranque (Listener de Estado) ---
    // Este es el "corazón" de un AuthContext real.
    // Escucha cambios de estado de Firebase/Supabase en tiempo real.
    useEffect(() => {
        setIsLoading(true);

        // --- ¡AQUÍ VA LA CONEXIÓN REAL! (Ej. Firebase) ---
        // Descomenta esto cuando tengas Firebase configurado:
        /*
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            // Usuario está logueado
            setIsAuthenticated(true);
            // setUser(firebaseUser);
            console.log("VM (Listener): Usuario detectado", firebaseUser.email);
          } else {
            // Usuario no está logueado
            setIsAuthenticated(false);
            // setUser(null);
            console.log("VM (Listener): No hay usuario.");
          }
          setIsLoading(false);
        });
        
        // Cleanup: se desuscribe cuando el componente se desmonta
        return () => unsubscribe();
        */

        // --- Simulación (Borrar cuando conectes Firebase) ---
        const timer = setTimeout(() => {
            console.log("VM: Simulación de arranque, usuario no logueado.");
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
        // --- Fin de Simulación ---

    }, []);

    // --- Lógica de Negocio (Funciones del ViewModel) ---

    /**
     * Inicia sesión con email y contraseña.
     */
    const signIn = async (email: string, pass: string) => {
        console.log("VM: Intentando iniciar sesión con", email);
        setIsLoading(true);

        try {
            // --- ¡AQUÍ VA LA CONEXIÓN REAL! (Ej. Firebase) ---
            // Descomenta esto cuando tengas Firebase:
            /*
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);
            // El listener (onAuthStateChanged) detectará el cambio y 
            // actualizará 'isAuthenticated' automáticamente.
            console.log("VM: Inicio de sesión exitoso para", userCredential.user.email);
            */

            // --- Simulación (Borrar cuando conectes Firebase) ---
            if (email === 'test@user.com' && pass === '123456') {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setIsAuthenticated(true); // En la simulación, esto es manual.
                console.log("VM: Simulación de login exitosa");
            } else {
                throw new Error("Credenciales incorrectas (simulado)");
            }
            // --- Fin de Simulación ---

        } catch (error: any) {
            console.error("VM Error (signIn):", error.message);
            // Aquí podrías setear un estado de error para la Vista
            // ej: setError(error.message);
        } finally {
            // Esto se ejecuta siempre, haya éxito or error
            setIsLoading(false);
        }
    };

    /**
     * Cierra la sesión del usuario.
     */
    const signOut = async () => {
        console.log("VM: Cerrando sesión...");
        setIsLoading(true);

        try {
            // --- ¡AQUÍ VA LA CONEXIÓN REAL! (Ej. Firebase) ---
            // Descomenta esto:
            // await firebaseSignOut(auth);
            // El listener (onAuthStateChanged) detectará el cambio.

            // --- Simulación (Borrar cuando conectes Firebase) ---
            await new Promise(resolve => setTimeout(resolve, 500));
            setIsAuthenticated(false); // En la simulación, esto es manual.
            // --- Fin de Simulación ---

        } catch (error: any) {
            console.error("VM Error (signOut):", error.message);
            // ej: setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Valor del ViewModel a exponer ---
    const value: AuthViewModel = {
        isAuthenticated,
        isLoading,
        signIn,
        signOut
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// --- El Hook (Consumidor del ViewModel) ---
export function useAuthViewModel() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthViewModel debe ser usado dentro de un AuthProvider');
    }
    return context;
}
