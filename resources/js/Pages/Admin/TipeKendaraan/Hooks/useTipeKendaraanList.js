import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tipeKendaraanApi } from '@/Utils/Apis/TipeKendaraanApi';

export function useTipeKendaraanList(params = {}) {
    return useQuery({
        queryKey: ['tipe-kendaraan', params],
        queryFn: () => tipeKendaraanApi.getAll(params),
        keepPreviousData: true,
    });
}

export function useDeleteTipeKendaraan() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => tipeKendaraanApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tipe-kendaraan'],
            });
        },
    });
}