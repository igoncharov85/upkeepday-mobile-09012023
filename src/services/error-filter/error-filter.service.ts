import { pushToastsAction } from "../../store/app";
import { dispatch } from "../../store/store";

export class ErrorFilterService {
    static validateError(error: any, withPush = true, withLog = true) {
        if (withPush) {
            dispatch(pushToastsAction({
                type: 'info',
                text1: error?.response?.data?.status,
                autoHide: true,
            }))
        }
        if (withLog) {
            console.log(`withLog: ${JSON.stringify(error)}`)
        }

    }
}