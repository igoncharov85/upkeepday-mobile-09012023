import { BASE_URL } from "../../../common/constants/server";
import { IUserCreateRequest } from "../../../common/types/user";
import { AsyncStorageService } from "../../async-storage";
import { $axiosAuth } from "../base.instance";
import axios from 'axios'

export class UserService {
    static async fetchAllUsers() {
        try {

            const token = await AsyncStorageService.getToken();
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${BASE_URL}/tutor/students/`,
                headers: {
                    'Authorization': token,
                },
            };

            const response = await axios.request(config);

            return response;
        } catch (err) {
            console.log('error student', err);
            return null;
        }
    }
    static async createUser(data: IUserCreateRequest) {
        return await $axiosAuth.post('/tutor/students', data)
    }
}