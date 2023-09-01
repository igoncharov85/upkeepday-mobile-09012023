import { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { addLocationsAction, setLocationLoading, setLocationsAction } from '..';
import { IAction } from '../../../common/types/common.types';
import { IIdRequest, ILocation, ILocationRequest } from '../../../common/types/location';
import { LocationService } from '../../../services/axios/location';
import { ErrorFilterService } from '../../../services/error-filter/error-filter.service';
import { LocationConstantsEnum } from '../constants';
import { loggerActions } from '../../logger';

export function* fetchLocationsWorker({ payload }: IAction<number | undefined>): SagaIterator {
    try {
        yield put(setLocationLoading(true));
        const { data, config }: AxiosResponse<Array<ILocation>, any> = yield call(LocationService.fetchLocations, payload);
        yield put(loggerActions.add({ type: 'response', name: 'fetchLocationsWorker: ', message: { data, config } }));
        if (data) {
            yield put(setLocationsAction(data));
        };
    } catch (error) {
        console.warn("fetchLocationsWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'fetchLocationsWorker: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setLocationLoading(false));
    };
};

export function* addLocationWorker({ payload }: IAction<ILocationRequest>): SagaIterator {
    try {
        yield put(setLocationLoading(true));
        const { data }: AxiosResponse<ILocation, any> = yield call(LocationService.addLocation, payload);
        yield put(loggerActions.add({ type: 'response', name: 'addLocationWorker: ', message: data }));
        if (data) {
            yield put(addLocationsAction(data));
        };
    } catch (error) {
        console.warn("addLocationWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'addLocationWorker: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setLocationLoading(false));
    };
};

export function* fetchLocationByIdWorker({ payload }: IAction<IIdRequest>): SagaIterator {
    try {
        yield put(setLocationLoading(true));
        const { data }: AxiosResponse<ILocation, any> = yield call(LocationService.fetchLocationById, payload.Id);
        yield put(loggerActions.add({ type: 'response', name: 'fetchLocationByIdWorker: ', message: data }));
        if (data) {
            yield put(addLocationsAction(data));
        };
    } catch (error) {
        console.warn("fetchLocationByIdWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'fetchLocationByIdWorker: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setLocationLoading(false));
    };
};

export function* locationSagaWatcher() {
    yield takeEvery(LocationConstantsEnum.FETCH_LOCATIONS, fetchLocationsWorker)
    yield takeEvery(LocationConstantsEnum.ADD_LOCATION, addLocationWorker)
    yield takeEvery(LocationConstantsEnum.GET_LOCATION_BY_ID, fetchLocationByIdWorker)
};