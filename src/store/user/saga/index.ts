import { AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import { addStudentAction, setCheckinStudentAction, setCurrentStudentAction, setStudentAction, setStudentListAction, setStudentLoading, setUsersAction } from "..";
import { IAction } from "../../../common/types/common.types";
import { ICheckinUser, IUserCreateRequest, IUserStudent, ICheckinsId, IUserCheckinsRequest, IDeleteUserRequest, IUpdateStudent, IUserStudentResponse, IStudentRequest, IStudentResponse, IStudentsRequest, IStudentsResponse, IStudentByIdResponse } from "../../../common/types/user";
import { UserService } from "../../../services/axios/user";
import { ErrorFilterService } from "../../../services/error-filter/error-filter.service";
import { UserContactsEnum } from "../constants";
import { IStudent } from "../../../common/types/classes.types";

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
        yield put(setStudentLoading(true))
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
    } finally {
        yield put(setStudentLoading(false))
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


// delete student 
export function* deleteStudentWorker(payload: IAction<IStudentRequest>): SagaIterator {
    try {
        yield call(
            UserService.deleteStudent,
            payload.payload
        );

    } catch (error) {
        ErrorFilterService.validateError(error)
    }
}
// get student 
export function* fetchStudentsWorker(payload: IAction<IStudentsRequest>): SagaIterator {
    try {
        yield put(setStudentLoading(true))
        const { data }: AxiosResponse<Array<IStudentResponse>, any> = yield call(
            UserService.fetchStudentsByStatus,
            payload.payload
        );
        if (data) {
            yield put(setUsersAction(data))
        }
    } catch (error) {
        ErrorFilterService.validateError(error)
    } finally {
        yield put(setStudentLoading(false))
    }
}
export function* fetchStudentsByIdWorker(payload: IAction<IStudentRequest>): SagaIterator {
    try {
        const { data }: AxiosResponse<Array<IStudentByIdResponse>, any> = yield call(
            UserService.fetchStudentById,
            payload.payload
        );
        if (data) {
            console.log(data);

            yield put(setStudentListAction(data))
        }
    } catch (error) {
        ErrorFilterService.validateError(error)
    }
}
// update student 
export function* updateStudentWorker(payload: IAction<IStudentRequest & IUserCreateRequest>): SagaIterator {
    try {
        yield call(
            UserService.updateStudent,
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
    yield takeEvery(UserContactsEnum.DELETE_STUDENTS, deleteStudentWorker)
    yield takeEvery(UserContactsEnum.FETCH_STUDENTS_BY_STATUS, fetchStudentsWorker)
    yield takeEvery(UserContactsEnum.FETCH_STUDENTS_BY_ID, fetchStudentsByIdWorker)
    yield takeEvery(UserContactsEnum.UPDATE_STUDENTS, updateStudentWorker)
}