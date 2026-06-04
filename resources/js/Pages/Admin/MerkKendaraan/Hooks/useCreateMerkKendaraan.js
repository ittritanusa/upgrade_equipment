import { useMutation, useQueryClient } from '@tanstack/react-query';
import { merkKendaraanApi } from '@/Utils/Apis/MerkKendaraanApi';

export function useCreateMerkKendaraan() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: (payload) =>
            merkKendaraanApi.create(payload),

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['merk-kendaraan'],
            });
        },
    });
}