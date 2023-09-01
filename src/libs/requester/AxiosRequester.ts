import Axios from "axios";
import { IRequester } from ".";
// import { userModel } from "../../entities/user/User";
// import { loggerModel } from "../../UIKit/logger/entity/loggerModel";

class AxiosRequester implements IRequester {
    private static instance: AxiosRequester;

    constructor() {
        if (AxiosRequester.instance) {
            return AxiosRequester.instance;
        }
        AxiosRequester.instance = this;
    }

    private serverError = (status: number) => {
        if (status >= 500) {

        }
    }

    postFormData = async (url: string, data: FormData) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'multipart/form-data',
                    //  'authorization': `Bearer ${userModel?.token}` 
                },
                body: data,
            });
            const result = await response.json();
            // loggerModel.add('response', `AxiosRequester -> postFormData -> ${url}: `, JSON.stringify(response));
            return { data: result, status: response.status };
        } catch (error: any) {
            this.serverError(error?.status);
            // loggerModel.add('error', `AxiosRequester -> postFormData -> ${url}: `, JSON.stringify(error));
            console.warn('AxiosRequester -> postFormData: ', error);
            return error?.response || {};
        }
    }

    post = async (url: string, data?: object, headers?: object, timeoutMS?: number): Promise<any> => {
        try {
            const config: any = {
                method: 'POST',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json',
                    // 'authorization': `Bearer ${userModel?.token}`
                },
                url,
                timeout: timeoutMS || 60000
            };
            headers && (config.headers = headers);
            data && (config.data = JSON.stringify(data));
            const response = await Axios(config);
            // loggerModel.add('response', `AxiosRequester -> post -> ${url}: `, JSON.stringify(response.data));
            return response;
        } catch (error: any) {
            this.serverError(error?.status);
            // loggerModel.add('error', `AxiosRequester -> post:  -> ${url} ${JSON.stringify(data)}: `, JSON.stringify(error));
            console.warn('AxiosRequester -> post: ', error);
            return error?.response || {};
        }
    }

    get = async (url: string, params?: object, headers?: object, timeoutMS?: number): Promise<any> => {
        try {
            const config: any = {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json',
                    // 'authorization': `Bearer ${userModel?.token}`
                },
                url,
                timeout: timeoutMS || 60000
            };
            headers && (config.headers = headers);
            params && (config.params = params);
            const response = await Axios(config);
            // loggerModel.add('response', `AxiosRequester -> get -> ${url}: `, JSON.stringify(response.data));
            return response;
        } catch (error: any) {
            this.serverError(error?.status);
            // loggerModel.add('error', `AxiosRequester -> get -> ${url}: `, JSON.stringify(error));
            console.warn('AxiosRequester -> get: ', error);
            return error?.response || {};
        }
    }

    delete = async (url: string, data?: object, headers?: object, timeoutMS?: number): Promise<any> => {
        try {
            const config: any = {
                method: 'DELETE',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json',
                    // 'authorization': `Bearer ${userModel?.token}`
                },
                url,
                timeout: timeoutMS || 60000
            };
            headers && (config.headers = headers);
            data && (config.data = JSON.stringify(data));
            console.log(config)
            const response = await Axios(config);
            return response;
        } catch (error: any) {
            this.serverError(error?.status);
            // loggerModel.add('error', `AxiosRequester -> delete:  -> ${url} ${JSON.stringify(data)}: `, JSON.stringify(error));
            console.warn('AxiosRequester -> delete: ', error);
            return error?.response || {};
        }
    }

}

export const requester = new AxiosRequester();
