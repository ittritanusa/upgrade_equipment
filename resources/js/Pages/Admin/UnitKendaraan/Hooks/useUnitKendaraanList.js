import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { unitKendaraanApi } from '@/Utils/Apis/UnitKendaraanApi';

export function useUnitKendaraanList(params = {}) {
    return useQuery({
        queryKey: ['unit-kendaraan', params],
        queryFn: () => unitKendaraanApi.getAll(params),
        keepPreviousData: true,
    });
}

export function useDeleteUnitKendaraan() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => unitKendaraanApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['unit-kendaraan'],
            });
        },
    });
}