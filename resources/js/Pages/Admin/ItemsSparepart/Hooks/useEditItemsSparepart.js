import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import { ItemsSparepartApi } from '@/Utils/Apis/ItemsSparepartApi';

/**
 * Detail Unit Area
 */
export function useDetailItemsSparepart(id) {

    return useQuery({

        queryKey: [
            'items-sparepart-detail',
            id,
        ],

        queryFn: async () => {

            const response =
                await ItemsSparepartApi.getById(id);

            return response.data.data;
        },

        enabled: !!id,

        staleTime: 1000 * 60 * 5,
    });
}

/**
 * Update Unit Kendaraan
 */
export function useUpdateItemsSparepart() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({
            id,
            payload,
        }) => {

            const response =
                await ItemsSparepartApi.update(
                    id,
                    payload
                );

            return response.data;
        },

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey: ['items-sparepart'],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    'items-sparepart-detail',
                    variables.id,
                ],
            });
        },
    });
}