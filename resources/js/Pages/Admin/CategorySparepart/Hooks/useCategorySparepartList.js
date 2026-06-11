import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { CategorySparepartApi } from '@/Utils/Apis/CategorySparepartApi';

export function useCategorySparepartList({
    search,
    limit,
    page,
}) {
    return useQuery({
        queryKey: [
            'category-sparepart',
            search,
            limit,
            page,
        ],

        queryFn: async () => {

            const response =
                await CategorySparepartApi.getAll({
                    search,
                    limit,
                    page,
                });

            return response.data;
        },

        keepPreviousData: true,
    });
}

export function useDeleteCategorySparepart() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (id) =>
            CategorySparepartApi.delete(id),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['category-sparepart'],
            });

        },
    });
}