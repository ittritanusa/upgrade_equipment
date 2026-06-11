import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { ItemsSparepartApi } from '@/Utils/Apis/ItemsSparepartApi';

export function useItemsSparepartList({
    search,
    limit,
    page,
}) {
    return useQuery({
        queryKey: [
            'items-sparepart',
            search,
            limit,
            page,
        ],

        queryFn: async () => {

            const response =
                await ItemsSparepartApi.getAll({
                    search,
                    limit,
                    page,
                });

            return response.data;
        },

        keepPreviousData: true,
    });
}

export function useDeleteItemsSparepart() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (id) =>
            ItemsSparepartApi.delete(id),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['items-sparepart'],
            });

        },
    });
}