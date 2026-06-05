import axios from '@/Utils/Libs/Axios';

export const KendaraanApi = {

    getUnitKendaraan() {
        return axios.get('/unit-kendaraan');
    },

    getAll(params) {

        return axios.get(
            '/kendaraan',
            {
                params,
            }
        );

    },

    getById(id) {
        return axios.get(
            `/kendaraan/${id}`
        );
    },

    create(payload) {
        return axios.post(
            '/kendaraan/create/save',
            payload
        );
    },

    update(id, payload) {
        return axios.post(
            `/kendaraan/edit/save/${id}`,
            payload
        );
    },

    delete(id) {
        return axios.delete(
            `/kendaraan/delete/save/${id}`
        );
    },

};