import { AxiosResponse } from "axios";
import { err } from "react-native-svg/lib/typescript/xml";
import { SagaIterator } from "redux-saga";
import { call, put, take, takeEvery } from "redux-saga/effects";
import { setAuthLoadingAction, setCountriesAction, setIsAuthAction, setStatesAction, setStatesLoading } from "..";
import { NavigationEnum } from "../../../common/constants/navigation";
import { IConfirmPassword, ILoginRequest, IRegistrationDto, IResetItemRequest, IStatusResponse, ITokenResponse } from "../../../common/types/auth.types";
import { IAction } from "../../../common/types/common.types";
import { AsyncStorageService } from "../../../services/async-storage";
import { AuthService } from "../../../services/axios/auth";
import { ErrorFilterService } from "../../../services/error-filter/error-filter.service";
import NavigationActions from "../../../services/navigation-service";
import { pushToastsAction } from "../../app";
import { AuthContactsEnum } from "../constants";

function* loginWorker({
    payload,
    type,
}: IAction<ILoginRequest>): SagaIterator {
    try {
        yield put(setAuthLoadingAction(true));
        const { data }: AxiosResponse<ITokenResponse, any> = yield call(
            AuthService.login,
            payload
        );

        if (data?.token) {
            console.log("set token ")
            yield call(AsyncStorageService.setToken, data.token)
            yield put(setIsAuthAction(true))
            yield put(pushToastsAction({
                type: 'info',
                text1: 'Login successful',
                autoHide: true,
            }))
            yield call(NavigationActions.navigate, NavigationEnum.HOME_SCREEN)
        }

    } catch (error: any) {
        console.warn("registrationWorker", error);
        yield call(ErrorFilterService.validateError, error)
    } finally {
        yield put(setAuthLoadingAction(false));
    }
}

function* registrationWorker({
    payload,
    type,
}: IAction<IRegistrationDto>): SagaIterator {
    try {
        yield put(setAuthLoadingAction(true));
        const { status }: AxiosResponse<IStatusResponse, any> = yield call(
            AuthService.registration,
            payload.type,
            payload.data
        );

        if (status) {
            yield put(pushToastsAction({
                type: 'info',
                text1: 'Please check your email',
                autoHide: true,
            }))
        }

    } catch (error: any) {
        console.warn("registrationWorker", error);
        yield call(ErrorFilterService.validateError, error)
    } finally {
        yield put(setAuthLoadingAction(false));
    }
}

function* sendResetMailWorker({
    payload,
    type,
}: IAction<string>): SagaIterator {
    try {
        yield put(setAuthLoadingAction(true));
        const { status }: AxiosResponse<IStatusResponse, any> = yield call(
            AuthService.resetPasswordSendEmail,
            payload,
        );

        if (status) {
            yield put(pushToastsAction({
                type: 'info',
                text1: 'Please check your email',
                autoHide: true,
            }))
        }

    } catch (error: any) {
        console.warn("registrationWorker", error);
        yield call(ErrorFilterService.validateError, error)
    } finally {
        yield put(setAuthLoadingAction(false));
    }
}

function* resetPasswordSendPasswordWorker({
    payload,
    type,
}: IAction<IConfirmPassword>): SagaIterator {
    try {
        yield put(setAuthLoadingAction(true));
        const { status }: AxiosResponse<IStatusResponse, any> = yield call(
            AuthService.resetPasswordNewPassword,
            payload,
        );

        if (status) {
            yield put(pushToastsAction({
                type: 'info',
                text1: 'Password set successfully',
                autoHide: true,
            }))
            NavigationActions.navigate(NavigationEnum.LOGIN)
        }

    } catch (error: any) {
        console.warn("registrationWorker", error);
        yield put(pushToastsAction({
            type: 'info',
            text1: error.response.data.status,
            autoHide: true,
        }))
    } finally {
        yield put(setAuthLoadingAction(false));
    }
}

function* getCountriesWorker({
    payload,
    type,
}: IAction<undefined>): SagaIterator {
    try {
        const { data }: AxiosResponse<Array<string>, any> = yield call(
            AuthService.getCountries
        );

        if (data) {
            yield put(setCountriesAction(data))
        }
    } catch (error: any) {
        console.warn("getCountriesWorker", error);
    }
}
function* getStatesWorker({
    payload,
    type,
}: IAction<string>): SagaIterator {
    try {
        yield put(setStatesLoading(true))
        const { data }: AxiosResponse<{ [key: string]: string }, any> = yield call(
            AuthService.getStates,
            payload
        );
        let normalizedStates = Object.values(data).map((el) => el)
        if (data) {
            yield put(setStatesAction(normalizedStates))
        }
    } catch (error: any) {
        console.warn("getStatesWorker error:", error);
    } finally {
        yield put(setStatesLoading(false))
    }
}


function* confirmRegistrationPasswordWorker({
    payload,
    type,
}: IAction<IConfirmPassword>): SagaIterator {
    try {
        yield put(setAuthLoadingAction(true));
        const { status }: AxiosResponse<IStatusResponse, any> = yield call(
            AuthService.confirmRegistrationPassword,
            payload
        );

        if (status) {
            yield put(pushToastsAction({
                type: 'info',
                text1: 'Password set successfully',
                autoHide: true,
            }))
            NavigationActions.navigate(NavigationEnum.LOGIN)
        }

    } catch (error: any) {
        console.warn("registrationWorker", error);
        yield put(pushToastsAction({
            type: 'info',
            text1: error.response.data.status,
            autoHide: true,
        }))
    } finally {
        yield put(setAuthLoadingAction(false));
    }
}

function* logoutWorker({
    payload,
    type,
}: IAction<IRegistrationDto>): SagaIterator {
    try {
        yield call(AsyncStorageService.setToken, "")
        yield call(NavigationActions.navigate, NavigationEnum.LOGIN)
        yield put(setIsAuthAction(false))

    } catch (error) {
        console.error("fechGeneralRatingWithParamsWorker", error);
    }
}

export function* authWatcher() {
    yield takeEvery(AuthContactsEnum.LOGIN, loginWorker)
    yield takeEvery(AuthContactsEnum.LOGOUT, logoutWorker)
    yield takeEvery(AuthContactsEnum.REGISTRATION, registrationWorker)
    yield takeEvery(AuthContactsEnum.CONFIRM_REGISTRATION_PASSWORD, confirmRegistrationPasswordWorker)
    yield takeEvery(AuthContactsEnum.RESET_PASSWORD_SEND_EMAIL, sendResetMailWorker)
    yield takeEvery(AuthContactsEnum.RESET_PASSWORD_NEW_PASSWORD, resetPasswordSendPasswordWorker)
    yield takeEvery(AuthContactsEnum.GET_STATES, getStatesWorker)
    yield takeEvery(AuthContactsEnum.GET_COUNTRIES, getCountriesWorker)
}