import { ICreateClassRequest, IGenerateScheduleRequest, IScheduleRequest } from "../../../common/types/schedule.types";
import { $axiosAuth } from '../base.instance'
export class ScheduleService {
    static async fetchSchedule({ endDate, startDate }: IScheduleRequest) {
        return $axiosAuth.get(`/tutor/schedules/${startDate}/${endDate}`)
    }
    static async deleteSchedules({ endDate, startDate }: IScheduleRequest) {
        return $axiosAuth.delete(`/tutor/schedules/${startDate}/${endDate}`)
    }
    static async generateScheduleEntry(data: IGenerateScheduleRequest) {
        return $axiosAuth.post(`/schedule/generate_schedule_entry`, data)
    }
    static async createClass(data: ICreateClassRequest) {
        return $axiosAuth.post(`/tutor/classes`, data)
    }
}