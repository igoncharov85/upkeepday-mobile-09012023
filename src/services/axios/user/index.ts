import { IUserCheckinsRequest, IUserCreateRequest, ICheckinsId, IDeleteUserRequest, IUpdateStudent, IStudentRequest, IStudentsRequest, } from "../../../common/types/user";
import { $axiosAuth } from "../base.instance";

export class UserService {
    static async fetchAllUsers(schoolId?: number) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/students`
            : `/tutor/students/`;
        return await $axiosAuth.get(link);
    }

    static async createUser({ data, schoolId }: { data: IUserCreateRequest, schoolId?: number }) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/students`
            : '/tutor/students';
        return await $axiosAuth.post(link, data)
    }

    static async fetchCheckinsUser({ sessionId, schoolId }: { sessionId: ICheckinsId, schoolId?: number }) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/checkins/${sessionId}`
            : `/tutor/checkins/${sessionId}`;
        return await $axiosAuth.get(link);
    }

    static async checkinsUser({ sessionId, chekins, schoolId }: IUserCheckinsRequest) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/checkins/${sessionId}`
            : `/tutor/checkins/${sessionId}`;
        return await $axiosAuth.put(link, chekins);
    }

    static async deleteUser({ schoolId, ...data }: IDeleteUserRequest) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/students/${data.StudentId}/classes`
            : `/tutor/students/${data.StudentId}/classes`;
        return await $axiosAuth.delete(link, { data })
    }

    static async updatedUser({ schoolId, ...data }: IUpdateStudent) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/classes/${data?.StudentId}/students`
            : `/tutor/classes/${data?.StudentId}/students`;
        return await $axiosAuth.put(link, { ExistingStudents: data?.ExistingStudents || [], NewStudents: data?.NewStudents || [] });
    }

    static async fetchUsersById({ sessionId, schoolId }: { sessionId: ICheckinsId, schoolId?: number }) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/classes/${sessionId}/students`
            : `/tutor/classes/${sessionId}/students`;
        return await $axiosAuth.get(link);
    }

    static async fetchStudentsByStatus({ status, schoolId }: IStudentsRequest) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/students` //TODO: add request with status if it will be on back
            : `/tutor/students/${status.toLowerCase()}`;
        return await $axiosAuth.get(link);
    }

    static async deleteStudent({ StudentId, schoolId }: IStudentRequest) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/students/${StudentId}`
            : `/tutor/students/${StudentId}`;
        return await $axiosAuth.delete(link);
    }

    static async updateStudent(data: IStudentRequest & IUserCreateRequest) {
        const { StudentId, schoolId, ...student } = data;
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/students/${StudentId}`
            : `/tutor/students/${StudentId}`;
        return await $axiosAuth.put(link, student);
    }

    static async fetchStudentById({ StudentId, schoolId }: (IStudentRequest)) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/students/${StudentId}/classes`
            : `/tutor/students/${StudentId}/classes`;
        return await $axiosAuth.get(link);
    }

    static async updateStudentStatus({ StudentId, status, schoolId }: (IStudentRequest & IStudentsRequest)) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/students/${StudentId}`
            : `/tutor/students/${StudentId}`;
        return await $axiosAuth.patch(link, { Status: status })
    }

};