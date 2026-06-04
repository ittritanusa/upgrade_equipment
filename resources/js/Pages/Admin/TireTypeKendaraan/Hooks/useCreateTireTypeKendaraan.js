import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tireTypeKendaraanApi } from '@/Utils/Apis/TireTypeKendaraanApi';

export function useCreateTireTypeKendaraan() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (payload) =>
            tireTypeKendaraanApi.create(payload),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['tire-type'],
            });
        },
    });
}

export function useTireTypeKendaraanList(params = {}) {
    return useQuery({
        queryKey: ['tipe-kendaraan', params],
        queryFn: () => tireTypeKendaraanApi.getUnitKendaraan(params),
        keepPreviousData: true,
    });
}