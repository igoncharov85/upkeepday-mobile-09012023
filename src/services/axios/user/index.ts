import { BASE_URL } from "../../../common/constants/server";
import { IUserCreateRequest } from "../../../common/types/user";
import { AsyncStorageService } from "../../async-storage";
import { $axiosAuth } from "../base.instance";
import axios from 'axios'

export class UserService {
    static async fetchAllUsers() {
        return await $axiosAuth.get(`/tutor/students/`)
    }
    static async createUser(data: IUserCreateRequest) {
        return await $axiosAuth.post('/tutor/students', data)
    }
}