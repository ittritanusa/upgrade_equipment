import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import { unitKendaraanApi } from '@/Utils/Apis/UnitKendaraanApi';

/**
 * Detail Unit Kendaraan
 */
export function useUnitKendaraanDetail(id) {

    return useQuery({

        queryKey: [
            'unit-kendaraan-detail',
            id,
        ],

        queryFn: async () => {

            const response =
                await unitKendaraanApi.getById(id);

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
                await unitKendaraanApi.update(
                    id,
                    payload
                );

            return response.data;
        },

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey: ['unit-kendaraan'],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    'unit-kendaraan-detail',
                    variables.id,
                ],
            });
        },
    });
}