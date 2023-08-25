import moment from "moment";
import { ICreateClassRequest, IDeleteScheduleRequest, IGenerateScheduleRequest, IScheduleRequest } from "../../../common/types/schedule.types";
import { convertLocalToUTC, convertToUTC } from "../../utils/convertToUTC";
import { $axiosAuth } from '../base.instance'



export class ScheduleService {
    static async fetchSessions({ endDate, startDate }: IScheduleRequest) {
        const utcStartDate = moment(startDate).utc().format('YYYY-MM-DDTHH:mm:ss');
        const utcEndDate = moment(endDate).utc().format('YYYY-MM-DDTHH:mm:ss');
        // console.log('--------server log--------')
        // console.log('with moment', utcStartDate, utcEndDate)
        // console.log('just ', startDate, endDate)
        return $axiosAuth.get(`/tutor/sessions/${utcStartDate}/${utcEndDate}`);
    }
    static async deleteSessions({ endDate, startDate, AllDay }: IDeleteScheduleRequest) {
        const utcStartDate = moment(startDate).utc().format('YYYY-MM-DDTHH:mm:ss');
        const utcEndDate = moment(endDate).utc().format('YYYY-MM-DDTHH:mm:ss');
        // console.log('--------server log--------')
        // console.log('with moment', utcStartDate, utcEndDate)
        // console.log('just ', startDate, endDate)
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
        return $axiosAuth.post(`/tutor/classes/`, convertToUTC(data))
    }
}