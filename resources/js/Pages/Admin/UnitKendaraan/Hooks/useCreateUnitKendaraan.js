import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unitKendaraanApi } from '@/Utils/Apis/UnitKendaraanApi';

export function useCreateUnitKendaraan() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (payload) =>
            unitKendaraanApi.create(payload),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['unit-kendaraan'],
            });
        },
    });
}