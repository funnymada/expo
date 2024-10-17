import axios from 'axios';

export const appAxios = axios.create({
    baseURL: 'https://api.livecoinwatch.com'
})

appAxios.interceptors.request.use(
    config => {
        config.headers['x-api-key'] = '70139c6b-633b-48f3-9f6b-fa597213a699';
        config.headers['content-type'] = 'application/json';
        return config;
    }, error => Promise.reject(error),
)
