import axios from '@/Utils/Libs/Axios';

export const tireTypeKendaraanApi = {

    getTipeKendaraan() {
        return axios.get('/tipe-kendaraan');
    },

    getAll(params) {

        return axios.get(
            '/tire-type',
            {
                params,
            }
        );

    },

    getById(id) {
        return axios.get(
            `/tire-type/${id}`
        );
    },

    create(payload) {
        return axios.post(
            '/tire-type/create/save',
            payload
        );
    },

    update(id, payload) {
        return axios.post(
            `/tire-type/edit/save/${id}`,
            payload
        );
    },

    delete(id) {
        return axios.delete(
            `/tire-type/delete/save/${id}`
        );
    },

};