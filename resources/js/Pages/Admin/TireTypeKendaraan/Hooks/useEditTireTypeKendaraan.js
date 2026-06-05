import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import { tireTypeKendaraanApi } from '@/Utils/Apis/TireTypeKendaraanApi';

/**
 * Detail Unit Kendaraan
 */
export function useTireTypeKendaraanDetail(id) {

    return useQuery({

        queryKey: [
            'tire-type-detail',
            id,
        ],

        queryFn: async () => {

            const response =
                await tireTypeKendaraanApi.getById(id);

            return response.data.data;
        },

        enabled: !!id,

        staleTime: 1000 * 60 * 5,
    });
}

/**
 * Update Unit Kendaraan
 */
export function useUpdateTireTypeKendaraan() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({
            id,
            payload,
        }) => {

            const response =
                await tireTypeKendaraanApi.update(
                    id,
                    payload
                );

            return response.data;
        },

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey: ['tire-type'],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    'tire-type-detail',
                    variables.id,
                ],
            });
        },
    });
}