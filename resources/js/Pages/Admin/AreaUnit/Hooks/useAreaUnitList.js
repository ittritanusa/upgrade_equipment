import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { AreaUnitApi } from '@/Utils/Apis/AreaUnitApi';

export function useAreaUnitList({
    search,
    limit,
    page,
}) {
    return useQuery({
        queryKey: [
            'area-unit',
            search,
            limit,
            page,
        ],

        queryFn: async () => {

            const response =
                await AreaUnitApi.getAll({
                    search,
                    limit,
                    page,
                });

            return response.data;
        },

        keepPreviousData: true,
    });
}

export function useDeleteAreaUnit() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (id) =>
            AreaUnitApi.delete(id),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['area-unit'],
            });

        },
    });
}