import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import { KendaraanApi } from '@/Utils/Apis/KendaraanApi';

/**
 * Detail Unit Kendaraan
 */
export function useKendaraanDetail(id) {

    return useQuery({

        queryKey: [
            'kendaraan-detail',
            id,
        ],

        queryFn: async () => {

            const response =
                await KendaraanApi.getById(id);

            return response.data.data;
        },

        enabled: !!id,

        staleTime: 1000 * 60 * 5,
    });
}