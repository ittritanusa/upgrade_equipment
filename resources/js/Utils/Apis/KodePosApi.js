import axios from '@/Utils/Libs/Axios';

export const KodePosApi = {
    getAll(params) {

        return axios.get(
            '/kode-pos',
            {
                params,
            }
        );

    },

    getById(id) {
        return axios.get(
            `/kode-pos/${id}`
        );
    },

    create(payload) {
        return axios.post(
            '/kode-pos/create/save',
            payload
        );
    },

    update(id, payload) {
        return axios.post(
            `/kode-pos/edit/save/${id}`,
            payload
        );
    },

    delete(id) {
        return axios.delete(
            `/kode-pos/delete/save/${id}`
        );
    },

};