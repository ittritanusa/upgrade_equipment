import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import { merkKendaraanApi } from '@/Utils/Apis/MerkKendaraanApi';

/**
 * Detail Merk Kendaraan
 */
export function useMerkKendaraanDetail(id) {

    return useQuery({

        queryKey: [
            'merk-kendaraan-detail',
            id,
        ],

        queryFn: async () => {

            const response =
                await merkKendaraanApi.getById(id);

            return response.data.data;
        },

        enabled: !!id,

        staleTime: 1000 * 60 * 5,
    });
}

/**
 * Update Merk Kendaraan
 */
export function useUpdateMerkKendaraan() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({
            id,
            payload,
        }) => {

            const response =
                await merkKendaraanApi.update(
                    id,
                    payload
                );

            return response.data;
        },

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({
                queryKey: ['merk-kendaraan'],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    'merk-kendaraan-detail',
                    variables.id,
                ],
            });
        },
    });
}