import { AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import { addStudentAction, setStudentAction } from "..";
import { IAction } from "../../../common/types/common.types";
import { IUserCreateRequest, IUserStudent } from "../../../common/types/user";
import { UserService } from "../../../services/axios/user";
import { ErrorFilterService } from "../../../services/error-filter/error-filter.service";
import { UserContactsEnum } from "../constants";

export function* fetchUserWorker(payload: IAction<null>): SagaIterator {
    try {
        console.log('fetchUserWorker!!!!')
        const { data }: AxiosResponse<Array<IUserStudent>, any> = yield call(
            UserService.fetchAllUsers,
        );
        if (data) {
            yield put(setStudentAction(data))
        }
        console.log("data:!!!!!! fetchUserWorker", data)
    } catch (error) {
        ErrorFilterService.validateError(error)
    }
}

export function* createUserWorker(payload: IAction<IUserCreateRequest>): SagaIterator {
    try {
        console.log('createUserWorker')
        const { data }: AxiosResponse<IUserStudent, any> = yield call(
            UserService.createUser,
            payload.payload
        );
        if (data) {
            yield put(addStudentAction(data))
        }
        console.log("data: createUserWorker", data)
    } catch (error) {
        ErrorFilterService.validateError(error)
    }
}

export function* userWatcher() {
    yield takeEvery(UserContactsEnum.FETCH_ALL_USERS, fetchUserWorker)
    yield takeEvery(UserContactsEnum.CREATE_USER, createUserWorker)
}