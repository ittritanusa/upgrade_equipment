import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { KodePosApi } from '@/Utils/Apis/KodePosApi';

export function useKodePosList({
    search,
    limit,
    page,
}) {
    return useQuery({
        queryKey: [
            'kode-pos',
            search,
            limit,
            page,
        ],

        queryFn: async () => {

            const response =
                await KodePosApi.getAll({
                    search,
                    limit,
                    page,
                });

            return response.data;
        },

        keepPreviousData: true,
    });
}

export function useDeleteKodePos() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (id) =>
            KodePosApi.delete(id),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['kode-pos'],
            });

        },
    });
}