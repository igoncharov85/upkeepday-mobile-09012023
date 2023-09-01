import { $axiosAuth } from "../base.instance";
import { IBusinessAccountForm } from "../../../store/businessAccountForm/entities/IBusinessAccountForm";
import { ITeacher } from "../../../store/businessAccount/entities/ITeacher";
import { IStudent, IUpdateStudent } from "../../../common/types/user";

export class BusinessAccountService {
    static async createSchool(data: IBusinessAccountForm) {
        return $axiosAuth.post('/schools/', data);
    };
    static async getSchools() {
        return $axiosAuth.get('/schools/');
    };
    static async getSchoolTeachers(schoolId: number) {
        return $axiosAuth.get(`/schools/${schoolId}/teachers`);
    };
    static async getSchoolStudents(schoolId: number, classId: number) {
        return $axiosAuth.get(`/schools/${schoolId}/classes/${classId}/students`);
    };
    static async editSchoolTeacher(schoolId: number, data: ITeacher) {
        return $axiosAuth.put(`/schools/${schoolId}/teachers/${data?.TeacherId}`, data);
    };
    static async deleteSchoolTeacher(schoolId: number, teacherId: number) {
        return $axiosAuth.delete(`/schools/${schoolId}/teachers/${teacherId}`);
    };
    static async updateSchoolClassesStudents(schoolId: number, classId: number, data: { ExistingStudents: number[], NewStudents: Array<IStudent>}) {
        return $axiosAuth.put(`/schools/${schoolId}/classes/${classId}/students`, data);
    };
    static async getSchoolClassStudents(schoolId: number, classId: number) {
        return $axiosAuth.get(`/schools/${schoolId}/classes/${classId}/students`);
    };
};