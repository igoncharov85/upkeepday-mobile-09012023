import moment from "moment";
import { ICreateClassRequest, IDeleteScheduleRequest, IGenerateScheduleRequest, IScheduleRequest } from "../../../common/types/schedule.types";
import { convertLocalToUTC, convertToUTC } from "../../utils/convertToUTC";
import { $axiosAuth } from '../base.instance'



export class ScheduleService {
    static async fetchSchedule({ endDate, startDate }: IScheduleRequest) {
        const utcStartDate = convertLocalToUTC(startDate);
        const utcEndDate = convertLocalToUTC(endDate);

        return $axiosAuth.get(`/tutor/schedules/${utcStartDate}/${utcEndDate}`);
    }
    static async deleteSchedules({ endDate, startDate, AllDay }: IDeleteScheduleRequest) {
        const utcStartDate = moment(startDate).utc().format('YYYY-MM-DDTHH:mm:ss');
        const utcEndDate = moment(endDate).utc().format('YYYY-MM-DDTHH:mm:ss');

        return $axiosAuth.delete(`/tutor/schedules/${utcStartDate}/${utcEndDate}`, {
            data: {
                AllDay
            }
        });
    }
    static async generateScheduleEntry(data: IGenerateScheduleRequest) {
        return $axiosAuth.post(`/schedule/generate_schedule_entry`, data)
    }
    static async createClass(data: ICreateClassRequest) {
        return $axiosAuth.post(`/tutor/classes/`, convertToUTC(data))
    }
}