import { AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { addStudentAction, setCheckinStudentAction, setCurrentStudentAction, setStudentAction, setStudentListAction, setStudentLoading, setUsersAction } from "..";
import { IAction } from "../../../common/types/common.types";
import { ICheckinUser, IUserCreateRequest, IUserStudent, ICheckinsId, IDeleteUserRequest, IUpdateStudent, IUserStudentResponse, IStudentRequest, IStudentResponse, IStudentsRequest, IStudentByIdResponse, IUserCheckinsRequest } from "../../../common/types/user";
import { UserService } from "../../../services/axios/user";
import { ErrorFilterService } from "../../../services/error-filter/error-filter.service";
import { UserContactsEnum } from "../constants";
import { loggerActions } from "../../logger";
import { selectBusinessAccount } from "../../businessAccount";
import { getSchoolStudentsAction } from "../../businessAccount/actions";

export function* fetchUserWorker({ payload }: IAction<number>): SagaIterator {
    try {
        const { currentSchool } = yield select(state => state.businessAccount);
        const { data, config }: AxiosResponse<Array<IUserStudent>, any> = yield call(UserService.fetchAllUsers, currentSchool?.SchoolId);
        if (data) {
            yield put(setStudentAction(data));
            yield put(loggerActions.add({ type: 'response', name: 'fetchUserWorker: ', message: { data, config } }));
        }
    } catch (error) {
        console.log('fetchUserWorker: ', error);
        yield put(loggerActions.add({ type: 'error', name: 'fetchUserWorker: ', message: error }));
        ErrorFilterService.validateError(error)
    }
}
export function* fetchUserByIdWorker(payload: IAction<{ sessionId: ICheckinsId, schoolId?: number }>): SagaIterator {
    try {
        yield put(setStudentLoading(true))
        yield put(setCurrentStudentAction([]))
        const { data }: AxiosResponse<Array<IUserStudentResponse>, any> = yield call(UserService.fetchUsersById, payload.payload);
        if (data) {
            yield put(setCurrentStudentAction(data));
            yield put(loggerActions.add({ type: 'response', name: 'fetchUserByIdWorker: ', message: data }));
        };
    } catch (error) {
        console.log('fetchUserByIdWorker: ', error);
        yield put(loggerActions.add({ type: 'error', name: 'fetchUserByIdWorker: ', message: error }));
        ErrorFilterService.validateError(error)
    } finally {
        yield put(setStudentLoading(false))
    }
}
export function* fetchCheckinUserWorker(payload: IAction<{ sessionId: ICheckinsId, schoolId?: number }>): SagaIterator {
    try {
        const { data }: AxiosResponse<Array<ICheckinUser>, any> = yield call(UserService.fetchCheckinsUser, payload.payload);
        if (data) {
            yield put(setCheckinStudentAction(data))
            yield put(loggerActions.add({ type: 'response', name: 'fetchCheckinUserWorker: ', message: data }));
        }
    } catch (error) {
        console.log('fetchCheckinUserWorker: ', error);
        yield put(loggerActions.add({ type: 'error', name: 'fetchCheckinUserWorker: ', message: error }));
        ErrorFilterService.validateError(error)
    }
}

export function* createUserWorker(payload: IAction<{ data: IUserCreateRequest, schoolId?: number }>): SagaIterator {
    try {
        const { data }: AxiosResponse<IUserStudent, any> = yield call(UserService.createUser, payload.payload);
        if (data) {
            yield put(addStudentAction(data))
            yield put(loggerActions.add({ type: 'response', name: 'createUserWorker: ', message: data }));
        }
    } catch (error) {
        console.log('createUserWorker: ', error);
        yield put(loggerActions.add({ type: 'error', name: 'createUserWorker: ', message: error }));
        ErrorFilterService.validateError(error)
    }
}

export function* checkinUserWorker(payload: IAction<IUserCheckinsRequest>): SagaIterator {
    try {
        const { data }: AxiosResponse<any, any> = yield call(UserService.checkinsUser, payload.payload);
        if (data) {
            yield put(addStudentAction(data))
            yield put(loggerActions.add({ type: 'response', name: 'checkinUserWorker: ', message: data }));
        }
    } catch (error) {
        console.log('checkinUserWorker: ', error);
        yield put(loggerActions.add({ type: 'error', name: 'checkinUserWorker: ', message: error }));
        ErrorFilterService.validateError(error)
    }
}

export function* deleteUserWorker(payload: IAction<IDeleteUserRequest>): SagaIterator {
    try {
        const { currentSchool, currentClass } = yield select(selectBusinessAccount);
        const { status } = yield call(UserService.deleteUser, {
            StudentId: payload.payload.StudentId,
            Classes: [currentClass.ClassId],
            schoolId: currentSchool.SchoolId,
        });
        yield put(loggerActions.add({ type: 'response', name: 'deleteUserWorker: ', message: status }));
    } catch (error) {
        console.log('deleteUserWorker: ', error);
        yield put(loggerActions.add({ type: 'error', name: 'deleteUserWorker: ', message: error }));
        ErrorFilterService.validateError(error)
    }
}

export function* updateUserWorker(payload: IAction<IUpdateStudent>): SagaIterator {
    try {
        const { currentClass, currentSchool } = yield select(selectBusinessAccount);
        const { status } = yield call(UserService.updatedUser, {
            schoolId: currentSchool.SchoolId,
            StudentId: currentClass.ClassId,
            ExistingStudents: payload.payload.ExistingStudents,
            NewStudents: payload.payload.NewStudents,
        });
        yield put(loggerActions.add({ type: 'response', name: 'updateUserWorker: ', message: status }));
    } catch (error) {
        console.log('updateUserWorker: ', error);
        yield put(loggerActions.add({ type: 'error', name: 'updateUserWorker: ', message: error }));
        ErrorFilterService.validateError(error)
    }
}

export function* deleteStudentWorker(payload: IAction<IStudentRequest>): SagaIterator {
    try {
        const { currentSchool } = yield select(selectBusinessAccount);
        const { status } = yield call(UserService.deleteStudent, { schoolId: currentSchool?.SchoolId, StudentId: payload.payload.StudentId });
        yield put(loggerActions.add({ type: 'response', name: 'deleteStudentWorker: ', message: status }));
        yield put(getSchoolStudentsAction());
    } catch (error) {
        console.log('deleteStudentWorker: ', error);
        yield put(loggerActions.add({ type: 'error', name: 'deleteStudentWorker: ', message: error }));
        ErrorFilterService.validateError(error)
    }
}

export function* fetchStudentsWorker(payload: IAction<IStudentsRequest>): SagaIterator {
    try {
        yield put(setStudentLoading(true))
        const { data }: AxiosResponse<Array<IStudentResponse>, any> = yield call(UserService.fetchStudentsByStatus, payload.payload);
        if (data) {
            yield put(setUsersAction(data))
            yield put(loggerActions.add({ type: 'response', name: 'fetchStudentsWorker: ', message: data }));
        }
    } catch (error) {
        console.log('fetchStudentsWorker: ', error);
        yield put(loggerActions.add({ type: 'error', name: 'fetchStudentsWorker: ', message: error }));
        ErrorFilterService.validateError(error)
    } finally {
        yield put(setStudentLoading(false))
    }
}

export function* fetchStudentsByIdWorker(payload: IAction<IStudentRequest>): SagaIterator {
    try {
        const { data }: AxiosResponse<Array<IStudentByIdResponse>, any> = yield call(UserService.fetchStudentById, payload.payload);
        if (data) {
            yield put(setStudentListAction(data))
            yield put(loggerActions.add({ type: 'response', name: 'fetchStudentsByIdWorker: ', message: data }));
        }
    } catch (error) {
        console.log('fetchStudentsByIdWorker: ', error);
        yield put(loggerActions.add({ type: 'error', name: 'fetchStudentsByIdWorker: ', message: error }));
        ErrorFilterService.validateError(error)
    }
}

export function* updateStudentWorker(payload: IAction<IStudentRequest & IUserCreateRequest>): SagaIterator {
    try {
        const { status } = yield call(UserService.updateStudent, payload.payload);
        yield put(loggerActions.add({ type: 'response', name: 'updateStudentWorker: ', message: status }));
    } catch (error) {
        console.log('updateStudentWorker: ', error);
        yield put(loggerActions.add({ type: 'error', name: 'updateStudentWorker: ', message: error }));
        ErrorFilterService.validateError(error)
    }
}

export function* updateStudentStatusWorker(payload: IAction<IStudentRequest & IStudentsRequest>): SagaIterator {
    try {
        const { status } = yield call(UserService.updateStudentStatus, payload.payload);
        yield put(loggerActions.add({ type: 'response', name: 'updateStudentStatusWorker: ', message: status }));
    } catch (error) {
        console.log('updateStudentStatusWorker: ', error);
        yield put(loggerActions.add({ type: 'error', name: 'updateStudentStatusWorker: ', message: error }));
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
    yield takeEvery(UserContactsEnum.UPDATE_STUDENTS_STATUS, updateStudentStatusWorker)
}