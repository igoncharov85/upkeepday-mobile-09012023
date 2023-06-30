import { IUserCheckins, IUserCheckinsRequest, IUserCreateRequest, ICheckinsId, IDeleteUserRequest, IUpdateStudent, } from "../../../common/types/user";
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
    static async deleteUser(data: (IDeleteUserRequest)) {
        return await $axiosAuth.delete(`/tutor/students/${data.StudentId}/classes`, { data })
    }
    static async updatedUser(data: (IUpdateStudent)) {
        const { StudentId, ExistingStudents, NewStudents } = data
        console.log(
            'result send data: \n\n\n\n\n'
            , ExistingStudents, NewStudents
        );

        return await $axiosAuth.put(`/tutor/classes/${StudentId}/students`, {
            ExistingStudents,
            NewStudents
        })
    }
    static async fetchUsersById(sessionId: ICheckinsId) {
        return await $axiosAuth.get(`/tutor/classes/${sessionId}/students`,)
    }
}