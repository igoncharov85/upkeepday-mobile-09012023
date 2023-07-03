import { AxiosResponse } from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { addLocationsAction, setLocationLoading, setLocationsAction } from '..';
import { IAction } from '../../../common/types/common.types';
import { IIdRequest, ILocation, ILocationRequest } from '../../../common/types/location';
import { LocationService } from '../../../services/axios/location';
import { ErrorFilterService } from '../../../services/error-filter/error-filter.service';
import { LocationConstantsEnum } from '../constants';


export function* fetchLocationsWorker({
    payload,
    type,
}: IAction<null>): SagaIterator {
    try {
        yield put(setLocationLoading(true));
        const data: AxiosResponse<Array<ILocation>, any> = yield call(
            LocationService.fetchLocations,
        );

        if (data?.data) {
            yield put(setLocationsAction(data?.data))
        }


    } catch (error) {
        yield call(ErrorFilterService.validateError, error)
    } finally {
        yield put(setLocationLoading(false));
    }
}

export function* addLocationWorker({
    payload,
    type,
}: IAction<ILocationRequest>): SagaIterator {
    try {
        yield put(setLocationLoading(true));
        const { data }: AxiosResponse<ILocation, any> = yield call(
            LocationService.addLocation,
            payload,
        );

        if (data) {

            yield put(addLocationsAction(data))
        }


    } catch (error) {
        yield call(ErrorFilterService.validateError, error)
    } finally {
        yield put(setLocationLoading(false));
    }
}

export function* fetchLocationByIdWorker({
    payload,
    type,
}: IAction<IIdRequest>): SagaIterator {
    try {
        yield put(setLocationLoading(true));
        const { data }: AxiosResponse<ILocation, any> = yield call(
            LocationService.fetchLocationById,
            payload.Id,
        );

        if (data) {
            yield put(addLocationsAction(data))
        }


    } catch (error) {
        yield call(ErrorFilterService.validateError, error)
    } finally {
        yield put(setLocationLoading(false));
    }
}



export function* locationSagaWatcher() {
    yield takeEvery(LocationConstantsEnum.FETCH_LOCATIONS, fetchLocationsWorker)
    yield takeEvery(LocationConstantsEnum.ADD_LOCATION, addLocationWorker)
    yield takeEvery(LocationConstantsEnum.GET_LOCATION_BY_ID, fetchLocationByIdWorker)
}