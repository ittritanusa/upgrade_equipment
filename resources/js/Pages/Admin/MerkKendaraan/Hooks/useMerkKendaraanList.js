import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { merkKendaraanApi } from '@/Utils/Apis/MerkKendaraanApi';

export function useMerkKendaraanList({
    search,
    limit,
    page,
}) {
    return useQuery({
        queryKey: [
            'merk-kendaraan',
            search,
            limit,
            page,
        ],

        queryFn: async () => {

            const response =
                await merkKendaraanApi.getAll({
                    search,
                    limit,
                    page,
                });

            return response.data;
        },

        keepPreviousData: true,
    });
}

export function useDeleteMerkKendaraan() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => merkKendaraanApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['merk-kendaraan'],
            });
        },
    });
}