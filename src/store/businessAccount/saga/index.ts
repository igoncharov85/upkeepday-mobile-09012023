import { AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import { NavigationEnum } from "../../../common/constants/navigation";
import { IAction } from "../../../common/types/common.types";
import { ErrorFilterService } from "../../../services/error-filter/error-filter.service";
import NavigationActions from "../../../services/navigation-service";
import { pushToastsAction } from "../../app";
import { BusinessAccountContactsEnum } from "../constants";
import { loggerActions } from "../../logger";
import { IBusinessAccountForm } from "../../businessAccountForm/entities/IBusinessAccountForm";
import { BusinessAccountService } from "../../../services/axios/businessAccount";
import { businessAccountActions } from "..";
import { LocationService } from "../../../services/axios/location";
import { ISchool } from "../entities/ISchool";
import { getSchoolsAction } from "../actions";

function* createSchool({ payload }: IAction<IBusinessAccountForm>): SagaIterator {
    try {
        yield put(businessAccountActions.setIsLoading(true));
        const { data }: AxiosResponse<ISchool & { message?: string }> = yield call(BusinessAccountService.createSchool, payload);
        if (data?.message) {
            yield put(pushToastsAction({ type: 'error', text1: data?.message, autoHide: true }));
            yield put(loggerActions.add({ type: 'error', name: 'createSchool: ', message: data }));
            return;
        };
        yield call(LocationService.addLocation, {
            LocationType: 'Office',
            AddressLine: data.AddressLine1,
            City: data.City,
            State: data.State,
            PostalCode: data.PostalCode,
            Country: data.Country,
            Rooms: [],
            schoolId: data.SchoolId,
        });
        yield put(getSchoolsAction());
        yield put(businessAccountActions.setIsSelectAccount(true));
        yield put(pushToastsAction({ type: 'info', text1: `Saved ${payload.School.BusinessName}`, autoHide: true }));
        yield put(loggerActions.add({ type: 'response', name: 'createSchool: ', message: data }));
        NavigationActions.navigate(NavigationEnum.HOME_SCREEN);
    } catch (error: any) {
        console.warn("createSchool: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'createSchool: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(businessAccountActions.setIsLoading(false));
    };
};

function* getSchools(): SagaIterator {
    try {
        yield put(businessAccountActions.setIsLoading(true));
        const { data }: AxiosResponse<any> = yield call(BusinessAccountService.getSchools);
        if (data?.message) {
            yield put(pushToastsAction({ type: 'error', text1: data?.message, autoHide: true }));
            yield put(loggerActions.add({ type: 'error', name: 'getSchools: ', message: data }));
            return;
        };
        yield put(loggerActions.add({ type: 'response', name: 'getSchools: ', message: data }));
        yield put(businessAccountActions.setSchools(data));
        NavigationActions.navigate(NavigationEnum.HOME_SCREEN);
    } catch (error: any) {
        console.warn("getSchools: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'getSchools: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(businessAccountActions.setIsLoading(false));
    };
};

function* getSchoolTeacher({ payload }: IAction<number>): SagaIterator {
    try {
        yield put(businessAccountActions.setIsLoading(true));
        const { data }: AxiosResponse<any> = yield call(BusinessAccountService.getSchoolTeachers, payload);
        if (data?.message) {
            yield put(pushToastsAction({ type: 'error', text1: data?.message, autoHide: true }));
            yield put(loggerActions.add({ type: 'error', name: 'getSchoolTeacher: ', message: data }));
            return;
        };
        yield put(loggerActions.add({ type: 'response', name: 'getSchoolTeacher: ', message: data }));
        yield put(businessAccountActions.setCurrentTeachers(data));
    } catch (error: any) {
        console.warn("getSchoolTeacher: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'getSchoolTeacher: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(businessAccountActions.setIsLoading(false));
    };
};

export function* businessAccountWatcher() {
    yield takeEvery(BusinessAccountContactsEnum.CREATE_SCHOOL, createSchool);
    yield takeEvery(BusinessAccountContactsEnum.GET_SCHOOLS, getSchools);
    yield takeEvery(BusinessAccountContactsEnum.GET_SCHOOL_TEACHERS, getSchoolTeacher);
};