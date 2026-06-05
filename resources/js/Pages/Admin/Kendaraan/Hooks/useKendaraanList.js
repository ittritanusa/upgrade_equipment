import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { KendaraanApi } from '@/Utils/Apis/KendaraanApi';

export function useKendaraanList({
    search,
    limit,
    page,
}) {
    return useQuery({
        queryKey: [
            'kendaraan',
            search,
            limit,
            page,
        ],

        queryFn: async () => {

            const response =
                await KendaraanApi.getAll({
                    search,
                    limit,
                    page,
                });

            return response.data;
        },

        keepPreviousData: true,
    });
}

export function useDeleteKendaraan() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (id) =>
            KendaraanApi.delete(id),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['kendaraan'],
            });

        },
    });
}