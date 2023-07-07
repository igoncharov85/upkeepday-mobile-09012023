import axios from "axios";
import { BASE_URL } from "../../common/constants/server";
import { AsyncStorageService } from "../async-storage";
import { dispatch } from "../../store/store";
import { logoutAction } from "../../store/auth/actions";


export const $axiosBase = axios.create({
    baseURL: BASE_URL,
});

export const $axiosAuth = axios.create({
    baseURL: BASE_URL,
});

$axiosBase.interceptors.request.use(
    async (config: any) => {
        console.log(`--------------------------\nrequest: ${config.method.toUpperCase()} ${config.baseURL}${config.url}\n_____________________________________\n`);
        return config;
    },
    (error) => {
        console.warn("base interceptor error", error);
        Promise.reject(error);
    }
);

$axiosAuth.interceptors.request.use(
    async (config: any) => {
        const token = await AsyncStorageService.getToken();

        console.log(`\n_____________________________________\nrequest: ${config.method.toUpperCase()} ${config.baseURL}${config.url} ${token}\n_____________________________________\n`);
        config.headers = {
            ...config.headers,
            Accept: "*/*",
            "Content-Type": "application/json",
            Connection: "keep-alive",
            Authorization: `${token}`,
        };
        return config;
    },
    (error) => {
        console.warn("interceptor error", error);
        Promise.reject(error);
    }
);

//handle messages
$axiosAuth.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            //dispatch(logoutAction());
        }
        throw error.response;
    }
);
