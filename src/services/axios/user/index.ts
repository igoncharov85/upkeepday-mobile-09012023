import { IUserCreateRequest } from "../../../common/types/user";
import { $axiosAuth } from "../base.instance";

export class UserService {
    static fetchAllUsers() {
        return $axiosAuth.get('/tutor/students')
    }
    static createUser(data: IUserCreateRequest) {
        return $axiosAuth.post('/tutor/students', data)
    }
}