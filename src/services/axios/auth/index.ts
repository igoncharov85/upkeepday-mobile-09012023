import axios from "axios";
import { BASE_URL } from "../../../common/constants/server";
import { IConfirmPassword, ILoginRequest, IRegistrationRequest, IResetItemData, IResetItemRequest, TRole } from "../../../common/types/auth.types";
import { $axiosAuth, $axiosBase } from "../base.instance";

export class AuthService {
    static async login(data: ILoginRequest) {
        return $axiosBase.post('/account/login', data)
    }
    static async registration(type: TRole, data: IRegistrationRequest) {
        return $axiosBase.post(`/account/register/${type}`, data)
    }
    static async resetPasswordSendEmail(email: string) {
        return $axiosBase.post(`/account/reset/${email}`)
    }
    static async resetPasswordSendCode(recoveryToken: string) {
        return $axiosBase.get(`/account/reset/${recoveryToken}`)
    }
    static async resetPasswordNewPassword({ uuid, Password }: IConfirmPassword) {
        return $axiosBase.put(`/account/reset/${uuid}`, { Password })
    }
    static async confirmRegistrationPassword({ uuid, Password }: IConfirmPassword) {
        return $axiosBase.post(`/account/confirm/${uuid}`, { Password })
    }
    static async getCountries() {
        return axios.get(`${BASE_URL}/reference/countries`)
    }
    static async getStates(country: string) {
        return axios.get(`${BASE_URL}/reference/countries/${country}`)
    }
    static async logout() {
        return $axiosBase.post('/account/logout')
    }

    static async getUser() {
        return $axiosAuth.get('/tutor/account');
    }
    static async userSendMainDeactivate() {
        return $axiosAuth.post(`/account/deactivate`);
    }
    static async userDeactivate({uuid}:{uuid:string}) {
        return $axiosAuth.delete(`/account/deactivate/${uuid}`);
    }
}