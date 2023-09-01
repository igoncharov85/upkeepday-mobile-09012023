import moment from "moment";
import { ICreateClassRequest, IDeleteScheduleRequest, IGenerateScheduleRequest, IScheduleRequest } from "../../../common/types/schedule.types";
import { convertLocalToUTC, convertToUTC } from "../../utils/convertToUTC";
import { $axiosAuth } from '../base.instance'

export class ScheduleService {
    static async fetchSessions({ endDate, startDate, schoolId }: IScheduleRequest) {
        const utcStartDate = convertLocalToUTC(startDate);
        const utcEndDate = convertLocalToUTC(endDate);
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/sessions/${utcStartDate}/${utcEndDate}`
            : `/tutor/sessions/${utcStartDate}/${utcEndDate}`;
        return $axiosAuth.get(link);
    }

    static async deleteSessions({ endDate, startDate, AllDay }: IDeleteScheduleRequest) {
        const utcStartDate = moment(startDate).utc().format('YYYY-MM-DDTHH:mm:ss');
        const utcEndDate = moment(endDate).utc().format('YYYY-MM-DDTHH:mm:ss');
        return $axiosAuth.delete(`/tutor/sessions/${utcStartDate}/${utcEndDate}`, {
            data: {
                AllDay
            }
        });
    }

    static async generateSessions({ data, schoolId }: { data: IGenerateScheduleRequest, schoolId?: number }) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/sessions/generate`
            : `/tutor/sessions/generate`;
        return $axiosAuth.post(link, data)
    }

    static async createClass({ data, schoolId }: { data: ICreateClassRequest, schoolId?: number }) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/classes`
            : `/tutor/classes/`;
        return $axiosAuth.post(link, convertToUTC(data))
    }

};