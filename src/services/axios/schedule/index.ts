import { IScheduleRequest } from "../../../common/types/schedule.types";
import {$axiosAuth} from '../base.instance'
export class ScheduleService {
    static async fetchSchedule({ endDate, startDate }: IScheduleRequest){
        return $axiosAuth.get(`https://cpio-dev.trixiron.com/tutor/schedules/${startDate}/${endDate}`)
    }
    static async deleteSchedules({ endDate, startDate }: IScheduleRequest){
        return $axiosAuth.delete(`https://cpio-dev.trixiron.com/tutor/schedules/${startDate}/${endDate}`)
    }
    static async deleteSchedules({ endDate, startDate }: IScheduleRequest){
        return $axiosAuth.delete(`https://cpio-dev.trixiron.com/tutor/schedules/${startDate}/${endDate}`)
    }
}