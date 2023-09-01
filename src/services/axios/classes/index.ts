import { IClassesEditName, IClassesUpdateSession, IClassesUpdateStatus, IGeneratedClasses, IGeneratedClassesRequest, TClassesId, TClassesStatus } from "../../../common/types/classes.types"; 
import { $axiosAuth } from "../base.instance";


export class ClassesService {
    static async fetchClasses({ status, schoolId }: { status: TClassesStatus, schoolId?: number }) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/classes`//TODO: add request with status if it will be on back
            : `/tutor/classes/${status}`;
        return $axiosAuth.get(link)
    }

    static async fetchClassesById({ id, schoolId }: { id: TClassesId, schoolId?: number }) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/classes/${id}`
            : `/tutor/classes/${id}`;
        return $axiosAuth.get(link)
    }

    static async fetchSessionClassesById({ id, schoolId }: { id: TClassesId, schoolId?: number }) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/classes/${id}/sessions`
            : `/tutor/classes/${id}/sessions`;
        return $axiosAuth.get(link)
    }

    static async fetchGeneratedClasses({ id, to, schoolId }: (IGeneratedClasses)) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/classes/${id}/extend/${to}`
            : `/tutor/classes/${id}/extend/${to}`;
        return $axiosAuth.get(link);
    }

    static async GeneratedClasses({ id, to, Sessions, schoolId }: (IGeneratedClassesRequest)) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/classes/${id}/extend/${to}`
            : `/tutor/classes/${id}/extend/${to}`;
        return $axiosAuth.patch(link, { Sessions })
    }

    static async deleteClasses({ id, schoolId }: { id: TClassesId, schoolId?: number }) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/classes/${id}`
            : `/tutor/classes/${id}`;
        return $axiosAuth.delete(link)
    }

    static async updatedStatusClasses({ id, Status, schoolId }: IClassesUpdateStatus) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/classes/${id}`
            : `/tutor/classes/${id}`;
        return $axiosAuth.patch(link, { Status })
    }

    static async updatedSessionClasses({ id, change, StartDateTime, schoolId }: IClassesUpdateSession) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/sessions/${id}/${change}`
            : `/tutor/sessions/${id}/${change}`;
        return $axiosAuth.put(link, { StartDateTime })
    }

    static async deleteSessionClasses({ id, schoolId }: { id: TClassesId, schoolId?: number }) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/sessions/${id}`
            : `/tutor/sessions/${id}`;
        return $axiosAuth.delete(link)
    }

    static async editNameClasses({ data, schoolId }: { data: IClassesEditName, schoolId?: number }) {
        const { Class, Location } = data;
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/classes/${data.id}/name_location`
            : `/tutor/classes/${data.id}/name_location`;
        return $axiosAuth.patch(link, { Class, Location })
    }

}