import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { tipeKendaraanApi } from '@/Utils/Apis/TipeKendaraanApi';

export function useTipeKendaraanList({
    search,
    limit,
    page,
}) {
    return useQuery({
        queryKey: [
            'tipe-kendaraan',
            search,
            limit,
            page,
        ],

        queryFn: async () => {

            const response =
                await tipeKendaraanApi.getAll({
                    search,
                    limit,
                    page,
                });

            return response.data;
        },

        keepPreviousData: true,
    });
}

export function useDeleteTipeKendaraan() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (id) =>
            tipeKendaraanApi.delete(id),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['tipe-kendaraan'],
            });

        },
    });
}