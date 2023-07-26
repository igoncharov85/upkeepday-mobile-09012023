import { IStudent } from "../../../common/types/classes.types";
import { IUserCheckins, IUserCheckinsRequest, IUserCreateRequest, ICheckinsId, IDeleteUserRequest, IUpdateStudent, IStudentRequest, IStudentsRequest, } from "../../../common/types/user";
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

        return await $axiosAuth.put(`/tutor/classes/${StudentId}/students`, {
            ExistingStudents,
            NewStudents
        })
    }
    static async fetchUsersById(sessionId: ICheckinsId) {
        return await $axiosAuth.get(`/tutor/classes/${sessionId}/students`,)
    }
    static async fetchStudentsByStatus({ status }: IStudentsRequest) {
        return await $axiosAuth.get(`/tutor/students/${status.toLowerCase()}`,)
    }
    static async deleteStudent({ StudentId }: IStudentRequest) {
        return await $axiosAuth.delete(`/tutor/students/${StudentId}`,)
    }
    static async updateStudent(data: IStudentRequest & IUserCreateRequest) {
        const { StudentId, ...student } = data
        console.log('student', student);

        return await $axiosAuth.put(`/tutor/students/${StudentId}`, student)
    }
    static async fetchStudentById({ StudentId }: (IStudentRequest)) {
        return await $axiosAuth.get(`/tutor/students/${StudentId}/classes`)
    }
    static async updateStudentStatus({ StudentId, status }: (IStudentRequest & IStudentsRequest)) {
        return await $axiosAuth.patch(`/tutor/students/${StudentId}`, { Status: status })
    }
}