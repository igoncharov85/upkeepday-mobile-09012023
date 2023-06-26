import { IUserCheckins, IUserCheckinsRequest, IUserCreateRequest, ICheckinsId, } from "../../../common/types/user";
import { $axiosAuth } from "../base.instance";

export class UserService {
    static async fetchAllUsers() {
        return await $axiosAuth.get(`/tutor/students/`)
    }
    static async createUser(data: IUserCreateRequest) {
        return await $axiosAuth.post('/tutor/students', data)
    }
    static async fetchCheckinsUser(sessionId: ICheckinsId) {
        return await $axiosAuth.get(`/tutor/checkins/${sessionId}`)
    }
    static async checkinsUser(data: { sessionId: ICheckinsId, chekins: IUserCheckinsRequest }) {
        return await $axiosAuth.put(`/tutor/checkins/${data.sessionId}`, data.chekins)
    }
}