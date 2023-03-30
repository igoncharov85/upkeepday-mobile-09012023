import axios from "axios";
import { BASE_URL } from "../../common/constants/server";
import { AsyncStorageService } from "../async-storage";


export const $axiosBase = axios.create({
    baseURL: BASE_URL,
});

export const $axiosAuth = axios.create({
    baseURL: BASE_URL,
});

$axiosBase.interceptors.request.use(
    async (config) => {
        console.log(`request: ${config.baseURL}${config.url}`);
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
        console.log(`request: ${config.baseURL}${config.url}`);
        config.headers = {
            Accept: "application/json",
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
