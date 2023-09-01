import { $axiosAuth } from "../base.instance";
import { IBusinessAccountForm } from "../../../store/businessAccountForm/entities/IBusinessAccountForm";

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
};