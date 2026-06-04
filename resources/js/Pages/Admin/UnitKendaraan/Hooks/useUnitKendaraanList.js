import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { unitKendaraanApi } from '@/Utils/Apis/UnitKendaraanApi';

export function useUnitKendaraanList({
    search,
    limit,
    page,
}) {
    return useQuery({
        queryKey: [
            'unit-kendaraan',
            search,
            limit,
            page,
        ],

        queryFn: async () => {

            const response =
                await unitKendaraanApi.getAll({
                    search,
                    limit,
                    page,
                });

            return response.data;
        },

        keepPreviousData: true,
    });
}

export function useDeleteUnitKendaraan() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => unitKendaraanApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['unit-kendaraan'],
            });
        },
    });
}