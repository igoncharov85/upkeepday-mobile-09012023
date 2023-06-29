import { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { setClassesLoading, setClassesAction, addClassesAction, setSessinAction, setClassAction, setCurrentSessionAction, setGenerateSessionAction } from '..';
import { IAction } from '../../../common/types/common.types';
import { ClassesService } from '../../../services/axios/classes';
import { ErrorFilterService } from '../../../services/error-filter/error-filter.service';
import { ClassesConstantsEnum } from '../constants';
import { IClassesEditName, IClassesResponse, IClassesUpdateSession, IGeneratedClasses, IGeneratedClassesRequest, IGeneratedClassesResponse, ISession, ISessionSubset, TClassesId, TClassesStatus } from '../../../common/types/classes.types';
import { convertSessionsToLocalTime } from '../../../services/utils/convertToUTC';




export function* fetchClassesWorker({
    payload,
    type,
}: IAction<TClassesStatus>): SagaIterator {
    try {
        yield put(setClassesLoading(true));
        const data: AxiosResponse<Array<IClassesResponse>, any> = yield call(
            ClassesService.fetchClasses,
            payload,
        );

        if (data?.data) {
            yield put(setClassesAction(data?.data))
        }

    } catch (error) {
        yield call(ErrorFilterService.validateError, error)
    } finally {
        yield put(setClassesLoading(false));
    }
}
export function* fetchClassesByIdWorker({
    payload,
    type,
}: IAction<TClassesId>): SagaIterator {
    try {
        yield put(setClassesLoading(true));
        const data: AxiosResponse<IClassesResponse, any> = yield call(
            ClassesService.fetchClassesById,
            payload,
        );

        if (data?.data) {
            console.log("fetchClassesByIdWorker");
            yield put(setClassAction(data?.data))

        }

    } catch (error) {
        yield call(ErrorFilterService.validateError, error)
    } finally {
        yield put(setClassesLoading(false));
    }
}
export function* fetchSessionClassesByIdWorker({
    payload,
    type,
}: IAction<TClassesId>): SagaIterator {
    try {
        yield put(setClassesLoading(true));
        const data: AxiosResponse<Array<ISession>, any> = yield call(
            ClassesService.fetchSessionClassesById,
            payload,
        );

        if (data?.data) {
            console.log("fetchSessionClassesByIdWorker");
            yield put(setSessinAction(data?.data))

        }

    } catch (error) {
        yield call(ErrorFilterService.validateError, error)
    } finally {
        yield put(setClassesLoading(false));
    }
}
export function* fetchGeneratedClassesWorker({
    payload,
    type,
}: IAction<IGeneratedClasses>): SagaIterator {
    try {
        yield put(setClassesLoading(true));

        const { data }: AxiosResponse<(IGeneratedClassesResponse), any> = yield call(
            ClassesService.fetchGeneratedClasses,
            payload,
        );
        if (data) {
            yield put(setGenerateSessionAction(data.GeneratedSessions))
            yield put(setCurrentSessionAction(convertSessionsToLocalTime(data.CurrentSessions)))

        }

    } catch (error) {
        yield call(ErrorFilterService.validateError, error)
    } finally {
        yield put(setClassesLoading(false));
    }
}
export function* GeneratedClassesWorker({
    payload,
    type,
}: IAction<IGeneratedClassesRequest>): SagaIterator {
    try {
        yield put(setClassesLoading(true));

        yield call(ClassesService.GeneratedClasses, payload);


    } catch (error) {
        yield call(ErrorFilterService.validateError, error)
    } finally {
        yield put(setClassesLoading(false));
    }
}


export function* deleteClassesWorker({
    payload,
    type,
}: IAction<TClassesId>): SagaIterator {
    try {
        yield put(setClassesLoading(true));
        yield call(ClassesService.deleteClasses, payload);

        console.log("Classes deleted successfully!");

    } catch (error) {
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setClassesLoading(false));
    }
}

export function* updateClassesWorker({
    payload,
    type,
}: IAction<TClassesStatus & TClassesId>): SagaIterator {
    try {
        yield put(setClassesLoading(true));
        const data: AxiosResponse<IClassesResponse, any> = yield call(
            ClassesService.updatedStatusClasses,
            payload,
        );


    } catch (error) {
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setClassesLoading(false));
    }
}

export function* deleteSessionClassesWorker({
    payload,
    type,
}: IAction<TClassesId>): SagaIterator {
    try {
        yield put(setClassesLoading(true));
        yield call(ClassesService.deleteSessionClasses, payload);

        console.log("Classes deleted successfully!");

    } catch (error) {
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setClassesLoading(false));
    }
}

export function* updateSessionClassesWorker({
    payload,
    type,
}: IAction<IClassesUpdateSession>): SagaIterator {
    try {
        yield put(setClassesLoading(true));
        const data: AxiosResponse<IClassesResponse, any> = yield call(
            ClassesService.updatedSessionClasses,
            payload,
        );


    } catch (error) {
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setClassesLoading(false));
    }
}
export function* editNameClassesWorker({
    payload,
    type,
}: IAction<IClassesEditName>): SagaIterator {
    try {

        yield put(setClassesLoading(true));
        yield call(ClassesService.editNameClasses, payload);
        console.log('editNameClassesWorker');


    } catch (error) {
        console.log(error);

        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setClassesLoading(false));
    }
}



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
}