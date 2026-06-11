import axios from '@/Utils/Libs/Axios';

export const ItemsSparepartApi = {
    getAll(params) {

        return axios.get(
            '/items-sparepart',
            {
                params,
            }
        );

    },

    getById(id) {
        return axios.get(
            `/items-sparepart/${id}`
        );
    },

    create(payload) {
        return axios.post(
            '/items-sparepart/create/save',
            payload
        );
    },

    update(id, payload) {
        return axios.post(
            `/items-sparepart/edit/save/${id}`,
            payload
        );
    },

    delete(id) {
        return axios.delete(
            `/items-sparepart/delete/save/${id}`
        );
    },

};