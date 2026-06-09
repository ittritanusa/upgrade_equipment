import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';

import { UnitBisnisApi } from '@/Utils/Apis/UnitBisnisApi';

export function useUnitBisnisList({
    search,
    limit,
    page,
}) {
    return useQuery({
        queryKey: [
            'unit-bisnis',
            search,
            limit,
            page,
        ],

        queryFn: async () => {

            const response =
                await UnitBisnisApi.getAll({
                    search,
                    limit,
                    page,
                });

            return response.data;
        },

        keepPreviousData: true,
    });
}

export function useDeleteUnitBisnis() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (id) =>
            UnitBisnisApi.delete(id),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['unit-bisnis'],
            });

        },
    });
}