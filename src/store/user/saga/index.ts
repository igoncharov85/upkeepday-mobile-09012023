import { AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import { addStudentAction, setCheckinStudentAction, setCurrentStudentAction, setStudentAction } from "..";
import { IAction } from "../../../common/types/common.types";
import { ICheckinUser, IUserCreateRequest, IUserStudent, ICheckinsId, IUserCheckinsRequest, IDeleteUserRequest, IUpdateStudent, IUserStudentResponse } from "../../../common/types/user";
import { UserService } from "../../../services/axios/user";
import { ErrorFilterService } from "../../../services/error-filter/error-filter.service";
import { UserContactsEnum } from "../constants";

export function* fetchUserWorker(payload: IAction<null>): SagaIterator {
    try {
        const { data }: AxiosResponse<Array<IUserStudent>, any> = yield call(
            UserService.fetchAllUsers,
        );
        if (data) {
            yield put(setStudentAction(data))
        }
    } catch (error) {
        console.log('error', error);

        ErrorFilterService.validateError(error)
    }
}
export function* fetchUserByIdWorker(payload: IAction<ICheckinsId>): SagaIterator {
    try {
        const { data }: AxiosResponse<Array<IUserStudentResponse>, any> = yield call(
            UserService.fetchUsersById,
            payload.payload
        );
        if (data) {
            yield put(setCurrentStudentAction(data))
        }
    } catch (error) {
        console.log('error', error);

        ErrorFilterService.validateError(error)
    }
}
export function* fetchCheckinUserWorker(payload: IAction<ICheckinsId>): SagaIterator {
    try {
        const { data }: AxiosResponse<Array<ICheckinUser>, any> = yield call(
            UserService.fetchCheckinsUser,
            payload.payload
        );
        if (data) {
            yield put(setCheckinStudentAction(data))
        }
    } catch (error) {
        console.log('error', error);

        ErrorFilterService.validateError(error)
    }
}

export function* createUserWorker(payload: IAction<IUserCreateRequest>): SagaIterator {
    try {
        const { data }: AxiosResponse<IUserStudent, any> = yield call(
            UserService.createUser,
            payload.payload
        );
        if (data) {
            yield put(addStudentAction(data))
        }
    } catch (error) {
        ErrorFilterService.validateError(error)
    }
}
export function* checkinUserWorker(payload: IAction<any>): SagaIterator {
    try {
        const { data }: AxiosResponse<any, any> = yield call(
            UserService.checkinsUser,
            payload.payload
        );
        if (data) {
            yield put(addStudentAction(data))
        }
    } catch (error) {
        ErrorFilterService.validateError(error)
    }
}
export function* deleteUserWorker(payload: IAction<IDeleteUserRequest>): SagaIterator {
    try {
        yield call(
            UserService.deleteUser,
            payload.payload
        );

    } catch (error) {
        ErrorFilterService.validateError(error)
    }
}
export function* updateUserWorker(payload: IAction<IUpdateStudent>): SagaIterator {
    try {
        yield call(
            UserService.updatedUser,
            payload.payload
        );

    } catch (error) {
        ErrorFilterService.validateError(error)
    }
}

export function* userWatcher() {
    yield takeEvery(UserContactsEnum.FETCH_ALL_USERS, fetchUserWorker)
    yield takeEvery(UserContactsEnum.FETCH_USERS_BY_ID, fetchUserByIdWorker)
    yield takeEvery(UserContactsEnum.CREATE_USER, createUserWorker)
    yield takeEvery(UserContactsEnum.FETCH_CHECKINS_USER, fetchCheckinUserWorker)
    yield takeEvery(UserContactsEnum.CHECKIN_USERS, checkinUserWorker)
    yield takeEvery(UserContactsEnum.DELETE_USER, deleteUserWorker)
    yield takeEvery(UserContactsEnum.UPDATE_USER, updateUserWorker)
}