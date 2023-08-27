import moment from "moment";
import { ICreateClassRequest, IDeleteScheduleRequest, IGenerateScheduleRequest, IScheduleRequest } from "../../../common/types/schedule.types";
import { convertLocalToUTC, convertToUTC } from "../../utils/convertToUTC";
import { $axiosAuth } from '../base.instance'



export class ScheduleService {
    static async fetchSessions({ endDate, startDate }: IScheduleRequest) {
        const utcStartDate = moment(startDate).utc().format('YYYY-MM-DDTHH:mm:ss');
        const utcEndDate = moment(endDate).utc().format('YYYY-MM-DDTHH:mm:ss');
        return $axiosAuth.get(`/tutor/sessions/${utcStartDate}/${utcEndDate}`);
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
    static async generateSessions(data: IGenerateScheduleRequest) {
        return $axiosAuth.post(`/tutor/sessions/generate`, data)
    }
    static async createClass(data: ICreateClassRequest) {
        console.log('createClass data:\n\n\n\n\n\n\n\n\n\n\n\n\n', data, '\n\n\n\n\n---------');

        return $axiosAuth.post(`/tutor/classes/`, convertToUTC(data))
    }
}