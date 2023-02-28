import { ILoginRequest, IRegistrationRequest, IResetItemData, IResetItemRequest, TRole } from "../../../common/types/auth.types";
import { $axiosBase } from "../base.instance";

export class AuthService {
    static async login(data: ILoginRequest) {
        return $axiosBase.post('/account/login', { data })
    }
    static async registration(type: TRole, data: IRegistrationRequest) {
        return $axiosBase.post(`/account/register/${type}`, { data })
    }
    static async resetPasswordSendEmail(email: string, data: IResetItemRequest) {
        return $axiosBase.post(`/account/reset/${email}`, data)
    }
    static async resetPasswordSendCode(recoveryToken: string) {
        return $axiosBase.get(`/account/reset/${recoveryToken}`)
    }
    static async resetPasswordNewPassword(email: string, data: IResetItemData) {
        return $axiosBase.put(`/account/reset/${email}`, data)
    }
}