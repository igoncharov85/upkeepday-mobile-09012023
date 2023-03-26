import { AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { call, takeEvery } from "redux-saga/effects";
import { IAction } from "../../../common/types/common.types";
import { IUserCreateRequest, IUserStudent } from "../../../common/types/user";
import { UserService } from "../../../services/axios/user";
import { ErrorFilterService } from "../../../services/error-filter/error-filter.service";
import { UserContactsEnum } from "../constants";

export function* fetchUserWorker(data: IAction<null>): SagaIterator {
    try {
        const { data }: AxiosResponse<Array<IUserStudent>, any> = yield call(
            UserService.fetchAllUsers,
        );
        console.log("data: ", data)
    } catch (error) {
        ErrorFilterService.validateError(error)
    }
}

export function* createUserWorker(data: IAction<IUserCreateRequest>): SagaIterator {
    try {
        const { data }: AxiosResponse<null, any> = yield call(
            UserService.createUser,
        );
        console.log("data: ", data)
    } catch (error) {
        ErrorFilterService.validateError(error)
    }
}

export function* userWatcher() {
    takeEvery(UserContactsEnum.FETCH_ALL_USERS, fetchUserWorker)
    takeEvery(UserContactsEnum.CREATE_USER, createUserWorker)
}