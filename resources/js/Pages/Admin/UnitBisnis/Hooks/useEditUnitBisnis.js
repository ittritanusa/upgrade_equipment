import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import { UnitBisnisApi } from '@/Utils/Apis/UnitBisnisApi';

/**
 * Detail Unit Area
 */
export function useDetailUnitBisnis(id) {

    return useQuery({

        queryKey: [
            'unit-bisnis-detail',
            id,
        ],

        queryFn: async () => {

            const response =
                await UnitBisnisApi.getById(id);

            return response.data.data;
        },

        enabled: !!id,

        staleTime: 1000 * 60 * 5,
    });
}

/**
 * Update Unit Kendaraan
 */
export function useUpdateUnitBisnis() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({
            id,
            payload,
        }) => {

            const response =
                await UnitBisnisApi.update(
                    id,
                    payload
                );

            return response.data;
        },

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey: ['unit-bisnis'],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    'unit-bisnis-detail',
                    variables.id,
                ],
            });
        },
    });
}