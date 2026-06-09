import axios from '@/Utils/Libs/Axios';

export const UnitBisnisApi = {
    getAll(params) {

        return axios.get(
            '/unit-bisnis',
            {
                params,
            }
        );

    },

    getById(id) {
        return axios.get(
            `/unit-bisnis/${id}`
        );
    },

    create(payload) {
        return axios.post(
            '/unit-bisnis/create/save',
            payload
        );
    },

    update(id, payload) {
        return axios.post(
            `/unit-bisnis/edit/save/${id}`,
            payload
        );
    },

    delete(id) {
        return axios.delete(
            `/unit-bisnis/delete/save/${id}`
        );
    },

};