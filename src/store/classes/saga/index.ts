import { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { setClassesLoading, setClassesAction, setSessinAction, setClassAction, setCurrentSessionAction, setGenerateSessionAction } from '..';
import { IAction } from '../../../common/types/common.types';
import { ClassesService } from '../../../services/axios/classes';
import { ErrorFilterService } from '../../../services/error-filter/error-filter.service';
import { ClassesConstantsEnum } from '../constants';
import { IClassesEditName, IClassesResponse, IClassesUpdateSession, IGeneratedClasses, IGeneratedClassesRequest, IGeneratedClassesResponse, ISession, TClassesId, TClassesStatus } from '../../../common/types/classes.types';
import { convertSessionsToLocalTime } from '../../../services/utils/convertToUTC';
import { loggerActions } from '../../logger';

export function* fetchClassesWorker({ payload }: IAction<{ status: TClassesStatus, schoolId?: number }>): SagaIterator {
    try {
        yield put(setClassesLoading(true));
        const data: AxiosResponse<Array<IClassesResponse>, any> = yield call(ClassesService.fetchClasses, payload);
        yield put(loggerActions.add({ type: 'response', name: 'fetchClassesWorker: ', message: data }));
        if (data?.data) {
            yield put(setClassesAction(data?.data));
        };
    } catch (error) {
        console.warn("fetchClassesWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'fetchClassesWorker: ', message: error }));
        yield call(ErrorFilterService.validateError, error)
    } finally {
        yield put(setClassesLoading(false));
    };
};

export function* fetchClassesByIdWorker({ payload }: IAction<{ id: TClassesId, schoolId?: number }>): SagaIterator {
    try {
        yield put(setClassesLoading(true));
        const data: AxiosResponse<IClassesResponse, any> = yield call(ClassesService.fetchClassesById, payload);
        yield put(loggerActions.add({ type: 'response', name: 'fetchClassesByIdWorker: ', message: data }));
        if (data?.data) {
            yield put(setClassAction(data?.data));
        };
    } catch (error) {
        console.warn("fetchClassesByIdWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'fetchClassesByIdWorker: ', message: error }));
        yield call(ErrorFilterService.validateError, error)
    } finally {
        yield put(setClassesLoading(false));
    };
};

export function* fetchSessionClassesByIdWorker({ payload }: IAction<{ id: TClassesId, schoolId?: number }>): SagaIterator {
    try {
        yield put(setClassesLoading(true));
        const { data }: AxiosResponse<Array<ISession>, any> = yield call(ClassesService.fetchSessionClassesById, payload);
        yield put(loggerActions.add({ type: 'response', name: 'fetchSessionClassesByIdWorker: ', message: data }));
        if (data) {
            yield put(setSessinAction(convertSessionsToLocalTime(data)));
        };
    } catch (error) {
        console.warn("fetchSessionClassesByIdWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'fetchSessionClassesByIdWorker: ', message: error }));
        yield call(ErrorFilterService.validateError, error)
    } finally {
        yield put(setClassesLoading(false));
    };
};

export function* fetchGeneratedClassesWorker({ payload }: IAction<IGeneratedClasses>): SagaIterator {
    try {
        yield put(setClassesLoading(true));
        const { data }: AxiosResponse<(IGeneratedClassesResponse), any> = yield call(ClassesService.fetchGeneratedClasses, payload);
        yield put(loggerActions.add({ type: 'response', name: 'fetchGeneratedClassesWorker: ', message: data }));
        if (data) {
            yield put(setGenerateSessionAction(data.GeneratedSessions));
            yield put(setCurrentSessionAction(convertSessionsToLocalTime(data.CurrentSessions)));
        };
    } catch (error) {
        console.warn("fetchGeneratedClassesWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'fetchGeneratedClassesWorker: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setClassesLoading(false));
    };
};

export function* GeneratedClassesWorker({ payload }: IAction<IGeneratedClassesRequest>): SagaIterator {
    try {
        yield put(setClassesLoading(true));
        yield call(ClassesService.GeneratedClasses, payload);
    } catch (error) {
        console.warn("GeneratedClassesWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'GeneratedClassesWorker: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setClassesLoading(false));
    };
};

export function* deleteClassesWorker({ payload }: IAction<{ id: TClassesId; schoolId?: number }>): SagaIterator {
    try {
        yield put(setClassesLoading(true));
        yield call(ClassesService.deleteClasses, payload);
    } catch (error) {
        console.warn("deleteClassesWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'deleteClassesWorker: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setClassesLoading(false));
    }
}

export function* updateClassesWorker(): SagaIterator {
    try {
        yield put(setClassesLoading(true));
    } catch (error) {
        console.warn("updateClassesWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'updateClassesWorker: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setClassesLoading(false));
    };
};

export function* deleteSessionClassesWorker({ payload }: IAction<{ id: TClassesId; schoolId?: number }>): SagaIterator {
    try {
        yield put(setClassesLoading(true));
        yield call(ClassesService.deleteSessionClasses, payload);
    } catch (error) {
        console.warn("deleteSessionClassesWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'deleteSessionClassesWorker: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setClassesLoading(false));
    };
};

export function* updateSessionClassesWorker({ payload }: IAction<IClassesUpdateSession>): SagaIterator {
    try {
        yield put(setClassesLoading(true));
        yield call(ClassesService.updatedSessionClasses, payload);
    } catch (error) {
        console.warn("updateSessionClassesWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'updateSessionClassesWorker: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setClassesLoading(false));
    }
}
export function* editNameClassesWorker({ payload }: IAction<{data: IClassesEditName, schoolId?: number }>): SagaIterator {
    try {
        yield put(setClassesLoading(true));
        yield call(ClassesService.editNameClasses, payload);
    } catch (error) {
        console.warn("editNameClassesWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'editNameClassesWorker: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setClassesLoading(false));
    };
};

export function* ClassesSagaWatcher() {
    yield takeEvery(ClassesConstantsEnum.FETCH_CLASEES, fetchClassesWorker)
    yield takeEvery(ClassesConstantsEnum.FETCH_CLASEES_BY_ID, fetchClassesByIdWorker)
    yield takeEvery(ClassesConstantsEnum.FETCH_SESSION_CLASEES_BY_ID, fetchSessionClassesByIdWorker)
    yield takeEvery(ClassesConstantsEnum.DELETE_CLASEES, deleteClassesWorker)
    yield takeEvery(ClassesConstantsEnum.UPDATE_STATUS_CLASEES, updateClassesWorker)
    yield takeEvery(ClassesConstantsEnum.DELETE_CLASEES_SESSION, deleteSessionClassesWorker)
    yield takeEvery(ClassesConstantsEnum.UPDATE_CLASEES_SESSION, updateSessionClassesWorker)
    yield takeEvery(ClassesConstantsEnum.EDIT_CLASS_NAME, editNameClassesWorker)
    yield takeEvery(ClassesConstantsEnum.FETCH_GENERATED_CLASSES, fetchGeneratedClassesWorker)
    yield takeEvery(ClassesConstantsEnum.FETCH_PATCH_GENERATED_CLASSES, GeneratedClassesWorker)
};