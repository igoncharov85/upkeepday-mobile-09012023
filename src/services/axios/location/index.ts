import { ILocationRequest } from "../../../common/types/location";
import { $axiosAuth } from "../base.instance";

export class LocationService {
    static fetchLocations() {
        return $axiosAuth.get('/tutor/locations/')
    }

    static addLocation(data: ILocationRequest) {
        console.log(data)
        return $axiosAuth.post('/tutor/locations/', data)
    }

    static fetchLocationById(id: string) {
        return $axiosAuth.post(`/tutor/locations/${id}`)
    }
}