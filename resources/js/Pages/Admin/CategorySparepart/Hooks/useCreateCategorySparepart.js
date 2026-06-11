import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CategorySparepartApi } from '@/Utils/Apis/CategorySparepartApi';

export function useCreateCategorySparepart() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (payload) =>
            CategorySparepartApi.create(payload),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['category-sparepart'],
            });
        },
    });
}

export function useCategorySparepartList(params = {}) {
    return useQuery({
        queryKey: ['category-sparepart', params],
        queryFn: () => CategorySparepartApi.getUnitKendaraan(params),
        keepPreviousData: true,
    });
}