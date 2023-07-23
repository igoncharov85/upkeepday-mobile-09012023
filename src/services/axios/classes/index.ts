import { IClassesEditName, IClassesUpdateSession, IClassesUpdateStatus, IGeneratedClasses, IGeneratedClassesRequest, TClassesId, TClassesStatus } from "../../../common/types/classes.types"; import { convertToUTC } from "../../utils/convertToUTC";
;
import { $axiosAuth } from "../base.instance";


export class ClassesService {
    static async fetchClasses(status: TClassesStatus) {
        return $axiosAuth.get(`/tutor/classes/${status}`)
    }
    static async fetchClassesById(id: TClassesId) {
        return $axiosAuth.get(`/tutor/classes/${id}`)
    }
    static async fetchSessionClassesById(id: TClassesId) {
        return $axiosAuth.get(`/tutor/classes/${id}/sessions`)
    }
    static async fetchGeneratedClasses({ id, to }: (IGeneratedClasses)) {
        // const to = new Date();
        return $axiosAuth.get(`/tutor/classes/${id}/extend/${to}`)
    }
    static async GeneratedClasses({ id, to, Sessions }: (IGeneratedClassesRequest)) {
        // const to = new Date();
        return $axiosAuth.patch(`/tutor/classes/${id}/extend/${to}`, { Sessions })
    }
    static async deleteClasses(id: TClassesId) {
        return $axiosAuth.delete(`/tutor/classes/${id}`)
    }
    static async updatedStatusClasses({ id, Status }: IClassesUpdateStatus) {
        return $axiosAuth.patch(`/tutor/classes/${id}`, { Status })
    }

    static async updatedSessionClasses({ id, change, StartDateTime }: IClassesUpdateSession) {
        return $axiosAuth.put(`/tutor/sessions/${id}/${change}`, { StartDateTime })
    }
    static async deleteSessionClasses(id: TClassesId) {
        return $axiosAuth.delete(`/tutor/sessions/${id}`)
    }
    static async editNameClasses(data: IClassesEditName) {
        const { Class, Location } = data;
        return $axiosAuth.patch(`/tutor/classes/${data.id}/name_location`, { Class, Location })
    }

}