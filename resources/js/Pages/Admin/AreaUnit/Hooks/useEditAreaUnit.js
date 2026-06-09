import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import { AreaUnitApi } from '@/Utils/Apis/AreaUnitApi';

/**
 * Detail Unit Area
 */
export function useDetailAreaUnit(id) {

    return useQuery({

        queryKey: [
            'area-unit-detail',
            id,
        ],

        queryFn: async () => {

            const response =
                await AreaUnitApi.getById(id);

            return response.data.data;
        },

        enabled: !!id,

        staleTime: 1000 * 60 * 5,
    });
}

/**
 * Update Unit Kendaraan
 */
export function useUpdateAreaUnit() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({
            id,
            payload,
        }) => {

            const response =
                await AreaUnitApi.update(
                    id,
                    payload
                );

            return response.data;
        },

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey: ['area-unit'],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    'area-unit-detail',
                    variables.id,
                ],
            });
        },
    });
}