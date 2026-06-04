import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { tireTypeKendaraanApi } from '@/Utils/Apis/TireTypeKendaraanApi';

export function useTireTypeKendaraanList({
    search,
    limit,
    page,
}) {
    return useQuery({
        queryKey: [
            'tire-type',
            search,
            limit,
            page,
        ],

        queryFn: async () => {

            const response =
                await tireTypeKendaraanApi.getAll({
                    search,
                    limit,
                    page,
                });

            return response.data;
        },

        keepPreviousData: true,
    });
}

export function useDeleteTireTypeKendaraan() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (id) =>
            tireTypeKendaraanApi.delete(id),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['tire-type'],
            });

        },
    });
}