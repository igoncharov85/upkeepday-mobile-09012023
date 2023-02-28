import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageEnum } from "../../common/constants/async-storage";

export class AsyncStorageService {
    static getToken = async () => {
        try {
            return await AsyncStorage.getItem(AsyncStorageEnum.JWT_TOKEN);
        } catch (e) {
            console.warn("getToken", e);
            return false;
        }
    };

    static setDataFromAsyncStorage = async (token: any) => {
        try {
            return await AsyncStorage.setItem(AsyncStorageEnum.JWT_TOKEN, token);
        } catch (e) {
            console.warn("setDataFromAsyncStorage", e);
            return false;
        }
    }
}