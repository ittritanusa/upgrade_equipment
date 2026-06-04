import axios from '@/Utils/Libs/Axios';

export const tipeKendaraanApi = {

    getUnitKendaraan() {
        return axios.get('/unit-kendaraan');
    },

    getAll(params) {

        return axios.get(
            '/tipe-kendaraan',
            {
                params,
            }
        );

    },

    getById(id) {
        return axios.get(
            `/tipe-kendaraan/${id}`
        );
    },

    create(payload) {
        return axios.post(
            '/tipe-kendaraan/create/save',
            payload
        );
    },

    update(id, payload) {
        return axios.post(
            `/tipe-kendaraan/edit/save/${id}`,
            payload
        );
    },

    delete(id) {
        return axios.delete(
            `/tipe-kendaraan/delete/save/${id}`
        );
    },

};