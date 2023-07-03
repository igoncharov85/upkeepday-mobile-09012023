import { ILocationRequest } from "../../../common/types/location";
import { $axiosAuth } from "../base.instance";

export class LocationService {
    static async fetchLocations() {
        return $axiosAuth.get('/tutor/locations/')
    }

    static async addLocation(data: ILocationRequest) {
        return $axiosAuth.post('/tutor/locations/', data)
    }

    static async fetchLocationById(id: string) {
        return $axiosAuth.post(`/tutor/locations/${id}`)
    }
}