import { ICreateClassRequest, IDeleteScheduleRequest, IGenerateScheduleRequest, IScheduleRequest } from "../../../common/types/schedule.types";
import { convertLocalToUTC, convertToUTC } from "../../utils/convertToUTC";
import { $axiosAuth } from '../base.instance'



export class ScheduleService {
    static async fetchSchedule({ endDate, startDate }: IScheduleRequest) {
        const utcStartDate = convertLocalToUTC(startDate);
        const utcEndDate = convertLocalToUTC(endDate);

        return $axiosAuth.get(`/tutor/schedules/${utcStartDate}/${utcEndDate}`);
    }
    static async deleteSchedules({ endDate, startDate, AllDay, Message }: IDeleteScheduleRequest) {
        const utcStartDate = convertLocalToUTC(startDate);
        const utcEndDate = convertLocalToUTC(endDate);
        return $axiosAuth.delete(`/tutor/schedules/${utcStartDate}/${utcEndDate}`, {
            data: {
                AllDay,
                Message
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