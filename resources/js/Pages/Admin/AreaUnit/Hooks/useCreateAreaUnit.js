import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AreaUnitApi } from '@/Utils/Apis/AreaUnitApi';

export function useCreateAreaUnit() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (payload) =>
            AreaUnitApi.create(payload),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['area-unit'],
            });
        },
    });
}

export function useAreaUnitList(params = {}) {
    return useQuery({
        queryKey: ['area-unit', params],
        queryFn: () => AreaUnitApi.getUnitKendaraan(params),
        keepPreviousData: true,
    });
}