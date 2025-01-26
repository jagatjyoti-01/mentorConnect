import axios from 'axios';
import CryptoJS from 'crypto-js'
import CYS from './Secret';
import { logout } from './axiosClient';

export function createAxiosClient({
    options,
    getCurrentAccessToken,
}: any) {
    const client = axios.create(options);
    client.interceptors.request.use((config: any) => {
        const token = getCurrentAccessToken();
        if (token) {
            config.headers.Authorization = token;
        }
        if(config.data instanceof FormData) {
            console.log(config.data)
        }
        else {
            // console.log(config.data)
            config.data = { cypher: CryptoJS.AES.encrypt(JSON.stringify(config.data), CYS).toString() }
        }
        return config;
    },
        (error) => {
            console.log(error)
            return Promise.reject(error);
        }
    );

    client.interceptors.response.use(
        response => {
            response.data.data = JSON.parse(CryptoJS.AES.decrypt(response.data.data, CYS).toString(CryptoJS.enc.Utf8))
            return response;
        },
        async error => {
            console.log(error)
            if(error.response === undefined) {
                alert("Internet failure or server disconnected")
            }
            else if (error.response.status === 401) {
                logout();
                return axios(error.config);
            }
            return Promise.reject(error);
        }
    );
    return client;

}