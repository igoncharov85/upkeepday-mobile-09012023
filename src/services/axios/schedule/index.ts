import axios from "axios";
import { BASE_URL } from "../../../common/constants/server";
import { ICreateClassRequest, IGenerateScheduleRequest, IScheduleRequest } from "../../../common/types/schedule.types";
import { AsyncStorageService } from "../../async-storage";
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
        try {
            const token = await AsyncStorageService.getToken();
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${BASE_URL}/tutor/classes`,
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const response = await axios.request(config);

            return response;
        } catch (err) {
            console.log('error createUser', err);
            return null;
        }





        // return $axiosAuth.post(`/tutor/classes`, data)
    }
}