import { AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import { IUser, setAuthLoadingAction, setCountriesAction, setIsAuthAction, setStatesAction, setStatesLoading, setUserAction } from "..";
import { NavigationEnum } from "../../../common/constants/navigation";
import { IConfirmPassword, ILoginRequest, IRegistrationDto, IStatusResponse, ITokenResponse } from "../../../common/types/auth.types";
import { IAction } from "../../../common/types/common.types";
import { AsyncStorageService } from "../../../services/async-storage";
import { AuthService } from "../../../services/axios/auth";
import { ErrorFilterService } from "../../../services/error-filter/error-filter.service";
import NavigationActions from "../../../services/navigation-service";
import { pushToastsAction } from "../../app";
import { AuthContactsEnum } from "../constants";
import { loggerActions } from "../../logger";

function* loginWorker({ payload }: IAction<ILoginRequest>): SagaIterator {
    try {
        yield put(setAuthLoadingAction(true));
        const { data }: AxiosResponse<ITokenResponse, any> = yield call(AuthService.login, payload);
        if (data?.token) {
            console.log("set token: ", data.token);
            yield call(AsyncStorageService.setToken, data.token);
            yield put(setIsAuthAction(true));
            yield put(pushToastsAction({ type: 'info', text1: 'Login successful', autoHide: true }));
            yield put(loggerActions.add({ type: 'response', name: 'loginWorker: ', message: data }));
            const response: AxiosResponse<IUser> = yield call(AuthService.getUser);
            yield put(loggerActions.add({ type: 'response', name: 'loginWorker (user): ', message: response.data }));
            yield put(setUserAction(response.data));
            NavigationActions.navigate(NavigationEnum.HOME_SCREEN);
        };
    } catch (error: any) {
        console.warn("loginWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'loginWorker: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setAuthLoadingAction(false));
    };
};

function* registrationWorker({ payload }: IAction<IRegistrationDto>): SagaIterator {
    try {
        yield put(setAuthLoadingAction(true));
        const { status }: AxiosResponse<IStatusResponse, any> = yield call(AuthService.registration, payload.type, payload.data);
        yield put(loggerActions.add({ type: 'response', name: 'registrationWorker: ', message: status }));
        if (status) {
            yield put(pushToastsAction({ type: 'info', text1: 'Please check your email', autoHide: true }));
        };
    } catch (error: any) {
        console.warn("registrationWorker", error);
        yield put(loggerActions.add({ type: 'error', name: 'registrationWorker: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setAuthLoadingAction(false));
    };
};

function* sendResetMailWorker({ payload }: IAction<string>): SagaIterator {
    try {
        yield put(setAuthLoadingAction(true));
        const { status }: AxiosResponse<IStatusResponse, any> = yield call(AuthService.resetPasswordSendEmail, payload);
        yield put(loggerActions.add({ type: 'response', name: 'sendResetMailWorker: ', message: status }));
        if (status) {
            yield put(pushToastsAction({ type: 'info', text1: 'Please check your email', autoHide: true, }));
        };
    } catch (error: any) {
        console.warn("sendResetMailWorker", error);
        yield put(loggerActions.add({ type: 'error', name: 'sendResetMailWorker: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    } finally {
        yield put(setAuthLoadingAction(false));
    };
};

function* resetPasswordSendPasswordWorker({ payload }: IAction<IConfirmPassword>): SagaIterator {
    try {
        yield put(setAuthLoadingAction(true));
        const { status }: AxiosResponse<IStatusResponse, any> = yield call(AuthService.resetPasswordNewPassword, payload);
        yield put(loggerActions.add({ type: 'response', name: 'resetPasswordSendPasswordWorker: ', message: status }));
        if (status) {
            yield put(pushToastsAction({ type: 'info', text1: 'Password set successfully', autoHide: true }));
            NavigationActions.navigate(NavigationEnum.LOGIN);
        };
    } catch (error: any) {
        console.warn("resetPasswordSendPasswordWorker", error);
        yield put(loggerActions.add({ type: 'error', name: 'resetPasswordSendPasswordWorker: ', message: error }));
        yield put(pushToastsAction({ type: 'info', text1: error.response.data.status, autoHide: true }));
    } finally {
        yield put(setAuthLoadingAction(false));
    };
};

function* getCountriesWorker(): SagaIterator {
    try {
        const { data }: AxiosResponse<Array<string>, any> = yield call(AuthService.getCountries);
        yield put(loggerActions.add({ type: 'response', name: 'getCountriesWorker: ', message: data }));
        if (data) {
            yield put(setCountriesAction(data));
        };
    } catch (error: any) {
        console.warn("getCountriesWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'getCountriesWorker: ', message: error }));
    };
};

function* getStatesWorker({ payload }: IAction<string>): SagaIterator {
    try {
        yield put(setStatesLoading(true))
        const { data }: AxiosResponse<{ [key: string]: string }, any> = yield call(AuthService.getStates, payload);
        yield put(loggerActions.add({ type: 'response', name: 'getStatesWorker: ', message: data }));
        let normalizedStates = Object.values(data).map((el) => el);
        if (data) {
            yield put(setStatesAction(normalizedStates));
        };
    } catch (error: any) {
        console.warn("getStatesWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'getStatesWorker: ', message: error }));
    } finally {
        yield put(setStatesLoading(false))
    }
}


function* confirmRegistrationPasswordWorker({ payload }: IAction<IConfirmPassword>): SagaIterator {
    try {
        yield put(setAuthLoadingAction(true));
        const { status }: AxiosResponse<IStatusResponse, any> = yield call(AuthService.confirmRegistrationPassword, payload);
        yield put(loggerActions.add({ type: 'response', name: 'confirmRegistrationPasswordWorker: ', message: status }));
        if (status) {
            yield put(pushToastsAction({ type: 'info', text1: 'Password set successfully', autoHide: true }));
            NavigationActions.navigate(NavigationEnum.LOGIN);
        };
    } catch (error: any) {
        console.warn("confirmRegistrationPasswordWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'confirmRegistrationPasswordWorker: ', message: error }));
        yield put(pushToastsAction({ type: 'info', text1: error.response.data.status, autoHide: true }));
    } finally {
        yield put(setAuthLoadingAction(false));
    };
};

function* logoutWorker(): SagaIterator {
    try {
        yield call(AsyncStorageService.setToken, "")
        yield call(NavigationActions.navigate, NavigationEnum.LOGIN)
        yield put(setIsAuthAction(false))
    } catch (error) {
        console.error("logoutWorker", error);
    };
};
function* userDeactivateWorker({ payload }: IAction<any>): SagaIterator {
    try {
        yield call(AuthService.userDeactivate, payload);
    } catch (error) {
      yield call(ErrorFilterService.validateError, error);
    } finally {
    };
};
function* userSendMainDeactivateWorker(): SagaIterator {
    try {
        yield call(AuthService.userSendMainDeactivate);
    } catch (error) {
      yield call(ErrorFilterService.validateError, error);
    } finally {
    };
};

function* getUserWorker(): SagaIterator {
    try {
        const { data }: AxiosResponse<IUser> = yield call(AuthService.getUser);
        if (data) {
            yield put(loggerActions.add({ type: 'response', name: 'getUserWorker: ', message: data }));
            yield put(setUserAction(data));
        };
    } catch (error: any) {
        console.warn("loginWorker: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'getUserWorker: ', message: error }));
        yield call(ErrorFilterService.validateError, error);
    }
};

export function* authWatcher() {
    yield takeEvery(AuthContactsEnum.LOGIN, loginWorker)
    yield takeEvery(AuthContactsEnum.LOGOUT, logoutWorker)
    yield takeEvery(AuthContactsEnum.REGISTRATION, registrationWorker)
    yield takeEvery(AuthContactsEnum.CONFIRM_REGISTRATION_PASSWORD, confirmRegistrationPasswordWorker)
    yield takeEvery(AuthContactsEnum.RESET_PASSWORD_SEND_EMAIL, sendResetMailWorker)
    yield takeEvery(AuthContactsEnum.RESET_PASSWORD_NEW_PASSWORD, resetPasswordSendPasswordWorker)
    yield takeEvery(AuthContactsEnum.GET_STATES, getStatesWorker)
    yield takeEvery(AuthContactsEnum.GET_COUNTRIES, getCountriesWorker)
    yield takeEvery(AuthContactsEnum.GET_USER, getUserWorker)
    yield takeEvery(AuthContactsEnum.USER_DEACTIVATE, userDeactivateWorker)
    yield takeEvery(AuthContactsEnum.USER_SEND_MAIN_DEACTIVATE, userSendMainDeactivateWorker)
};