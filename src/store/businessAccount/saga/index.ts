import { AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { NavigationEnum } from "../../../common/constants/navigation";
import { IAction } from "../../../common/types/common.types";
import { ErrorFilterService } from "../../../services/error-filter/error-filter.service";
import NavigationActions from "../../../services/navigation-service";
import { pushToastsAction } from "../../app";
import { BusinessAccountContactsEnum } from "../constants";
import { loggerActions } from "../../logger";
import { IBusinessAccountForm } from "../../businessAccountForm/entities/IBusinessAccountForm";
import { BusinessAccountService } from "../../../services/axios/businessAccount";
import { businessAccountActions, selectBusinessAccount } from "..";
import { LocationService } from "../../../services/axios/location";
import { ISchool } from "../entities/ISchool";
import { getSchoolClassStudentsAction, getSchoolTeachersAction, getSchoolsAction } from "../actions";
import { IStudent, IUpdateStudent } from "../../../common/types/user";
import { fetchClassesAction } from "../../classes/actions";

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

function* getSchoolTeacher(): SagaIterator {
    try {
        yield put(businessAccountActions.setIsLoading(true));
        const { currentSchool } = yield select(selectBusinessAccount);
        const { data }: AxiosResponse<any> = yield call(BusinessAccountService.getSchoolTeachers, currentSchool?.SchoolId);
        if (data?.message) {
            yield put(pushToastsAction({ type: 'error', text1: data?.message, autoHide: true }));
            yield put(loggerActions.add({ type: 'error', name: 'getSchoolTeacher: ', message: data }));
            return;
        };
        yield put(businessAccountActions.setSchoolTeachers(data));
        yield put(loggerActions.add({ type: 'response', name: 'getSchoolTeacher: ', message: data }));
    } catch (error: any) {
        console.warn("getSchoolTeacher: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'getSchoolTeacher: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(businessAccountActions.setIsLoading(false));
    };
};

function* getSchoolStudents(): SagaIterator {
    try {
        yield put(businessAccountActions.setIsLoading(true));
        const { currentSchool, currentClass } = yield select(selectBusinessAccount);
        const { data }: AxiosResponse<any> = yield call(BusinessAccountService.getSchoolStudents, currentSchool.SchoolId, currentClass.ClassId);
        if (data?.message) {
            yield put(loggerActions.add({ type: 'error', name: 'getSchoolStudents: ', message: data }));
            return;
        };
        yield put(businessAccountActions.setSchoolStudents(data));
        yield put(loggerActions.add({ type: 'response', name: 'getSchoolStudents: ', message: data }));
    } catch (error: any) {
        console.warn("getSchoolTeacher: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'getSchoolStudents: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(businessAccountActions.setIsLoading(false));
    };
};

function* editSchoolTeacher() {
    try {
        yield put(businessAccountActions.setIsLoading(true));
        const { currentSchool, editingTeacher } = yield select(selectBusinessAccount);
        const { data }: AxiosResponse<any> = yield call(BusinessAccountService.editSchoolTeacher, currentSchool.SchoolId, editingTeacher);
        if (data?.message) {
            yield put(loggerActions.add({ type: 'error', name: 'editSchoolTeacher: ', message: data }));
            return;
        };
        yield put(getSchoolTeachersAction());
        yield put(loggerActions.add({ type: 'response', name: 'editSchoolTeacher: ', message: data }));
    } catch (error: any) {
        console.warn("editSchoolTeacher: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'editSchoolTeacher: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(businessAccountActions.setIsLoading(false));
    };
};

function* deleteSchoolTeacher() {
    try {
        yield put(businessAccountActions.setIsLoading(true));
        const { currentSchool, editingTeacher } = yield select(selectBusinessAccount);
        const { data }: AxiosResponse<any> = yield call(BusinessAccountService.deleteSchoolTeacher, currentSchool.SchoolId, editingTeacher?.TeacherId);
        if (data?.message) {
            yield put(loggerActions.add({ type: 'error', name: 'deleteSchoolTeacher: ', message: data }));
            return;
        };
        yield put(getSchoolTeachersAction());
        yield put(loggerActions.add({ type: 'response', name: 'deleteSchoolTeacher: ', message: data }));
    } catch (error: any) {
        console.warn("deleteSchoolTeacher: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'deleteSchoolTeacher: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(businessAccountActions.setIsLoading(false));
    };
};

function* updateSchoolClassesStudents({ payload }: IAction<{ ExistingStudents: number[], NewStudents: Array<IStudent> }>) {
    try {
        yield put(businessAccountActions.setIsLoading(true));
        const { currentSchool, currentClass } = yield select(selectBusinessAccount);
        const { data }: AxiosResponse<any> = yield call(BusinessAccountService.updateSchoolClassesStudents, currentSchool.SchoolId, currentClass?.ClassId, payload);
        if (data?.message) {
            yield put(loggerActions.add({ type: 'error', name: 'updateSchoolClassesStudents: ', message: data }));
            return;
        };
        yield put(fetchClassesAction({ status: 'scheduled' }));
        yield put(getSchoolClassStudentsAction());
        yield put(loggerActions.add({ type: 'response', name: 'updateSchoolClassesStudents: ', message: data }));
    } catch (error: any) {
        console.warn("updateSchoolClassesStudents: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'updateSchoolClassesStudents: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(businessAccountActions.setIsLoading(false));
    };
};

function* getSchoolClassStudents() {
    try {
        yield put(businessAccountActions.setIsLoading(true));
        const { currentSchool, currentClass } = yield select(selectBusinessAccount);
        const { data }: AxiosResponse<any> = yield call(BusinessAccountService.getSchoolClassStudents, currentSchool.SchoolId, currentClass.ClassId);
        if (data?.message) {
            yield put(loggerActions.add({ type: 'error', name: 'getSchoolClassStudents: ', message: data }));
            return;
        };
        yield put(businessAccountActions.setCurrentClass({ ...currentClass, Students: data }));
        yield put(loggerActions.add({ type: 'response', name: 'getSchoolClassStudents: ', message: data }));
    } catch (error: any) {
        console.warn("getSchoolClassStudents: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'getSchoolClassStudents: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(businessAccountActions.setIsLoading(false));
    };
}

export function* businessAccountWatcher() {
    yield takeEvery(BusinessAccountContactsEnum.CREATE_SCHOOL, createSchool);
    yield takeEvery(BusinessAccountContactsEnum.GET_SCHOOLS, getSchools);
    yield takeEvery(BusinessAccountContactsEnum.GET_SCHOOL_TEACHERS, getSchoolTeacher);
    yield takeEvery(BusinessAccountContactsEnum.GET_SCHOOL_STUDENTS, getSchoolStudents);
    yield takeEvery(BusinessAccountContactsEnum.EDIT_SCHOOL_TEACHERS, editSchoolTeacher);
    yield takeEvery(BusinessAccountContactsEnum.DELETE_SCHOOL_TEACHERS, deleteSchoolTeacher);
    yield takeEvery(BusinessAccountContactsEnum.UPDATE_SCHOOL_CLASS_STUDENTS, updateSchoolClassesStudents);
    yield takeEvery(BusinessAccountContactsEnum.GET_SCHOOL_CLASS_STUDENTS, getSchoolClassStudents);

};