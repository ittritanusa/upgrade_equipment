import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KodePosApi } from '@/Utils/Apis/KodePosApi';

export function useCreateKodePos() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (payload) =>
            KodePosApi.create(payload),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['kode-pos'],
            });
        },
    });
}

export function useKodePosList(params = {}) {
    return useQuery({
        queryKey: ['kode-pos', params],
        queryFn: () => KodePosApi.getUnitKendaraan(params),
        keepPreviousData: true,
    });
}