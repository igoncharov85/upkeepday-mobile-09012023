import { pushToastsAction } from "../../store/app";
import { dispatch } from "../../store/store";

export class ErrorFilterService {
    static validateError(error: any, withPush = true, withLog = true) {
        if (withPush && (error?.response?.data?.status || error?.data?.message)) {
            dispatch(pushToastsAction({
                type: 'info',
                text1: error?.response?.data?.status || error?.data?.message,
                autoHide: true,
            }))
        }
        if (withLog) {
            console.log(`withLog: ${JSON.stringify(error)}`)
        }

    }
}