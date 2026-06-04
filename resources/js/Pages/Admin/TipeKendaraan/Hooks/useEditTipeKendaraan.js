import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import { tipeKendaraanApi } from '@/Utils/Apis/TipeKendaraanApi';

/**
 * Detail Unit Kendaraan
 */
export function useTipeKendaraanDetail(id) {

    return useQuery({

        queryKey: [
            'tipe-kendaraan-detail',
            id,
        ],

        queryFn: async () => {

            const response =
                await tipeKendaraanApi.getById(id);

            return response.data.data;
        },

        enabled: !!id,

        staleTime: 1000 * 60 * 5,
    });
}

/**
 * Update Unit Kendaraan
 */
export function useUpdateUnitKendaraan() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({
            id,
            payload,
        }) => {

            const response =
                await tipeKendaraanApi.update(
                    id,
                    payload
                );

            return response.data;
        },

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey: ['tipe-kendaraan'],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    'tipe-kendaraan-detail',
                    variables.id,
                ],
            });
        },
    });
}