// Estado del avistamiento
// Ajusta estos valores según lo que tu backend soporte (En_Calle, En_Albergue, Reunido)
export type SightingStatus = 'En_Calle' | 'En_Albergue' | 'Reunido';

// Estructura de datos para enviar al Backend
export interface SightingFormData {
    description: string;
    sighting_date: Date; // Requerido: string($date-time)
    location_text: string; // Ubicación donde se vio
    status: SightingStatus; // Estado del avistamiento
    // Nota: La imagen se maneja por separado (imageUri)
}

// Interfaz de respuesta exitosa del backend
export interface SightingSuccessResponse {
    success: boolean;
    data: {
        sighting: { id: string };
        matches_found?: number; // Opcional, si el BE devuelve coincidencias
    };
}

// Lo que llega "crudo" del Backend
export interface BackendSighting {
    report_id: string;
    user_id: string;
    image_url: string | null;
    species: string; // 'Perro', 'Gato', etc.
    breed?: string;
    status: SightingStatus;
    location_text: string;
    sighting_date: string; // ISO String
    description?: string;
}

// La estructura limpia que usará tu UI (PetCard)
export interface Sighting {
    id: string;
    imageUrl: string;
    location: string;
    createdAt: string;
    status: string; // 'lost' | 'found' para compatibilidad visual con PetCard
    type: 'dog' | 'cat' | 'other';
    description?: string;
    // En avistamientos no suele haber nombre, pero la card lo pide
    name: string;
}
