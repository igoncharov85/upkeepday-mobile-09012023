import { ILocationRequest } from "../../../common/types/location";
import { $axiosAuth } from "../base.instance";

export class LocationService {
    static async fetchLocations(schoolId?: number) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/locations`
            : '/tutor/locations/';
        return $axiosAuth.get(link);
    }

    static async addLocation({ schoolId, ...data }: ILocationRequest) {
        const link = typeof schoolId === 'number'
            ? `/schools/${schoolId}/locations`
            : '/tutor/locations/';
        return $axiosAuth.post(link, data)
    }

    static async fetchLocationById(id: string) {
        return $axiosAuth.post(`/tutor/locations/${id}`)
    }
}