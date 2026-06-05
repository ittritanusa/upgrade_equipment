import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KendaraanApi } from '@/Utils/Apis/KendaraanApi';

export function useCreateKendaraan() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (payload) =>
            KendaraanApi.create(payload),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['kendaraan'],
            });
        },
    });
}

export function useKendaraanList(params = {}) {
    return useQuery({
        queryKey: ['kendaraan', params],
        queryFn: () => KendaraanApi.getUnitKendaraan(params),
        keepPreviousData: true,
    });
}