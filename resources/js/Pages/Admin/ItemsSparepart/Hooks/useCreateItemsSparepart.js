import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ItemsSparepartApi } from '@/Utils/Apis/ItemsSparepartApi';

export function useCreateItemsSparepart() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (payload) =>
            ItemsSparepartApi.create(payload),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['items-sparepart'],
            });
        },
    });
}

export function useItemsSparepartList(params = {}) {
    return useQuery({
        queryKey: ['items-sparepart', params],
        queryFn: () => ItemsSparepartApi.getUnitKendaraan(params),
        keepPreviousData: true,
    });
}