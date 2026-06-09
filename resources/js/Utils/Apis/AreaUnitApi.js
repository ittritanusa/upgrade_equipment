import axios from '@/Utils/Libs/Axios';

export const AreaUnitApi = {
    getAll(params) {

        return axios.get(
            '/area-unit',
            {
                params,
            }
        );

    },

    getById(id) {
        return axios.get(
            `/area-unit/${id}`
        );
    },

    create(payload) {
        return axios.post(
            '/area-unit/create/save',
            payload
        );
    },

    update(id, payload) {
        return axios.post(
            `/area-unit/edit/save/${id}`,
            payload
        );
    },

    delete(id) {
        return axios.delete(
            `/area-unit/delete/save/${id}`
        );
    },

};