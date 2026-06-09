import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UnitBisnisApi } from '@/Utils/Apis/UnitBisnisApi';

export function useCreateUnitBisnis() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (payload) =>
            UnitBisnisApi.create(payload),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['unit-bisnis'],
            });
        },
    });
}

export function useUnitBisnisList(params = {}) {
    return useQuery({
        queryKey: ['unit-bisnis', params],
        queryFn: () => UnitBisnisApi.getUnitKendaraan(params),
        keepPreviousData: true,
    });
}