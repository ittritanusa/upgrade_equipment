import axios from '@/Utils/Libs/Axios';

export const unitKendaraanApi = {

    getAll() {
        return axios.get('/unit-kendaraan');
    },

    getById(id) {
        return axios.get(
            `/unit-kendaraan/${id}`
        );
    },

    create(payload) {
        return axios.post(
            '/unit-kendaraan/create/save',
            payload
        );
    },

    update(id, payload) {
        return axios.post(
            `/unit-kendaraan/edit/save/${id}`,
            payload
        );
    },

    delete(id) {
        return axios.delete(
            `/unit-kendaraan/delete/save/${id}`
        );
    },

};