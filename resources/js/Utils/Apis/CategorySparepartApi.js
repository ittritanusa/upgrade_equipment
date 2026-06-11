import axios from '@/Utils/Libs/Axios';

export const CategorySparepartApi = {
    getAll(params) {

        return axios.get(
            '/category-sparepart',
            {
                params,
            }
        );

    },

    getById(id) {
        return axios.get(
            `/category-sparepart/${id}`
        );
    },

    create(payload) {
        return axios.post(
            '/category-sparepart/create/save',
            payload
        );
    },

    update(id, payload) {
        return axios.post(
            `/category-sparepart/edit/save/${id}`,
            payload
        );
    },

    delete(id) {
        return axios.delete(
            `/category-sparepart/delete/save/${id}`
        );
    },

};