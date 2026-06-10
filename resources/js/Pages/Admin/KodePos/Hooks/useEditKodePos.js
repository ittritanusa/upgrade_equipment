import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import { KodePosApi } from '@/Utils/Apis/KodePosApi';

/**
 * Detail Unit Area
 */
export function useDetailKodePos(id) {

    return useQuery({

        queryKey: [
            'kode-pos-detail',
            id,
        ],

        queryFn: async () => {

            const response =
                await KodePosApi.getById(id);

            return response.data.data;
        },

        enabled: !!id,

        staleTime: 1000 * 60 * 5,
    });
}

/**
 * Update Unit Kendaraan
 */
export function useUpdateKodePos() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({
            id,
            payload,
        }) => {

            const response =
                await KodePosApi.update(
                    id,
                    payload
                );

            return response.data;
        },

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey: ['kode-pos'],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    'kode-pos-detail',
                    variables.id,
                ],
            });
        },
    });
}