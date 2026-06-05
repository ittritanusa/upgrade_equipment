import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import { KendaraanApi } from '@/Utils/Apis/KendaraanApi';

/**
 * Detail Unit Kendaraan
 */
export function useKendaraanDetail(id) {

    return useQuery({

        queryKey: [
            'kendaraan-detail',
            id,
        ],

        queryFn: async () => {

            const response =
                await KendaraanApi.getById(id);

            return response.data.data;
        },

        enabled: !!id,

        staleTime: 1000 * 60 * 5,
    });
}

/**
 * Update Unit Kendaraan
 */
export function useUpdateKendaraan() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({
            id,
            payload,
        }) => {

            const response =
                await KendaraanApi.update(
                    id,
                    payload
                );

            return response.data;
        },

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey: ['kendaraan'],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    'kendaraan-detail',
                    variables.id,
                ],
            });
        },
    });
}