import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tipeKendaraanApi } from '@/Utils/Apis/TipeKendaraanApi';

export function useCreateTipeKendaraan() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (payload) =>
            tipeKendaraanApi.create(payload),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['unit-kendaraan'],
            });
        },
    });
}

export function useTipeKendaraanList(params = {}) {
    return useQuery({
        queryKey: ['tipe-kendaraan', params],
        queryFn: () => tipeKendaraanApi.getUnitKendaraan(params),
        keepPreviousData: true,
    });
}