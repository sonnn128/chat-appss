import axios from 'axios';

// Create an axios instance
const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
    timeout: 5000,
});

// GET method
export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

// POST method:
export const post = async (path, data, options = {}) => {
    const response = await httpRequest.post(path, data, options);
    return response.data;
};

// PUT method
export const put = async (path, data, options = {}) => {
    const response = await httpRequest.put(path, data, options);
    return response.data;
};

// DELETE method
export const del = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export default httpRequest;

// --option--

// httpRequest.get(api, {
//     headers: {
//         Authorization: 'Bearer your_token_here',
//         'Content-Type': 'application/json',
//     },
//     params: { page: 1, limit: 10 },
//     timeout: 5000,
// });
