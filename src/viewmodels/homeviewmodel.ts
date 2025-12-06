import { Sighting } from '@/src/models/sightingmodel';
import { sightingService } from '@/src/services/sightservice'; // ⬅️ Cambio de servicio
import { useCallback, useEffect, useState } from 'react';
import { useAuthViewModel } from './authviewmodel';

export const useHomeViewModel = () => {
    const [sightings, setSightings] = useState<Sighting[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const { signOut } = useAuthViewModel();

    const loadData = async () => {
        if (!refreshing) setIsLoading(true);
        try {
            setError(null);
            // ⬅️ Llamamos a getSightings
            const data = await sightingService.getSightings();
            setSightings(data);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Error de conexión');
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadData();
    }, []);

    // Lógica de Filtrado (Búsqueda local)
    const filteredList = sightings.filter(item =>
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
        reports: filteredList, // Mantenemos el nombre 'reports' para no romper la vista, o renombramos
        isLoading,
        refreshing,
        error,
        searchQuery,
        setSearchQuery,
        onRefresh,
        signOut
    };
};
