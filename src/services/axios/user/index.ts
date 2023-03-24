import { $axiosAuth } from "../base.instance";

export class UserService {
    static fetchAllUsers() {
        return $axiosAuth.get('/tutor/students')
    }
}