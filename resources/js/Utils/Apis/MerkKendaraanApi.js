import axios from '@/Utils/Libs/Axios';

export const merkKendaraanApi = {
    getAll(params) {

        return axios.get(
            '/merk-kendaraan',
            {
                params,
            }
        );

    },

    getById(id) {
        return axios.get(
            `/merk-kendaraan/${id}`
        );
    },

    create(payload) {
        return axios.post(
            '/merk-kendaraan/create/save',
            payload
        );
    },

    update(id, payload) {
        return axios.post(
            `/merk-kendaraan/edit/save/${id}`,
            payload
        );
    },

    delete(id) {
        return axios.delete(
            `/merk-kendaraan/delete/save/${id}`
        );
    },

};