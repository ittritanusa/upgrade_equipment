import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import { CategorySparepartApi } from '@/Utils/Apis/CategorySparepartApi';

/**
 * Detail Unit Area
 */
export function useDetailCategorySparepart(id) {

    return useQuery({

        queryKey: [
            'category-sparepart-detail',
            id,
        ],

        queryFn: async () => {

            const response =
                await CategorySparepartApi.getById(id);

            return response.data.data;
        },

        enabled: !!id,

        staleTime: 1000 * 60 * 5,
    });
}

/**
 * Update Unit Kendaraan
 */
export function useUpdateCategorySparepart() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({
            id,
            payload,
        }) => {

            const response =
                await CategorySparepartApi.update(
                    id,
                    payload
                );

            return response.data;
        },

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey: ['category-sparepart'],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    'category-sparepart-detail',
                    variables.id,
                ],
            });
        },
    });
}