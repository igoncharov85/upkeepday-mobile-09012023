import { AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { setAuthLoadingAction } from "..";
import { ILoginRequest, IStatusResponse } from "../../../common/types/auth.types";
import { IAction } from "../../../common/types/common.types";
import { AuthService } from "../../../services/axios/auth";

function* loginWorker({
    payload,
    type,
}: IAction<ILoginRequest>): SagaIterator {
    try {
        yield put(setAuthLoadingAction(true));
        const { status }: AxiosResponse<IStatusResponse, any> = yield call(
            AuthService.login,
            payload
        );

        if(status){
            console.log("")
        }

        
    } catch (error) {
        console.error("fechGeneralRatingWithParamsWorker", error);
    } finally {
        yield put(setAuthLoadingAction(false));
    }
}