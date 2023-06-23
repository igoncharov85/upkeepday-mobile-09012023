import { IClassesUpdateSession, IClassesUpdateStatus, TClassesId, TClassesStatus } from "../../../common/types/classes.types";;
import { $axiosAuth } from "../base.instance";

export class ClassesService {
    static async fetchClasses(status: TClassesStatus) {
        return $axiosAuth.get(`/tutor/classes/${status}`)
    }
    static async fetchClassesById(id: TClassesId) {
        return $axiosAuth.get(`/tutor/classes/${id}/sessions`)
    }
    static async deleteClasses(id: TClassesId) {
        return $axiosAuth.delete(`/tutor/classes/${id}`)
    }
    static async updatedStatusClasses({ id, Status }: IClassesUpdateStatus) {
        return $axiosAuth.patch(`/tutor/classes/${id}`, { Status })
    }
    static async updatedSessionClasses({ id, change, StartDateTime }: IClassesUpdateSession) {
        return $axiosAuth.put(`/tutor/schedules/${id}/${change}`, { StartDateTime })
    }
    static async deleteSessionClasses(id: TClassesId) {
        return $axiosAuth.delete(`/tutor/schedules/${id}`)
    }

}