import { AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { call, put, take, takeEvery } from "redux-saga/effects";
import { setAuthLoadingAction } from "..";
import { NavigationEnum } from "../../../common/constants/navigation";
import { IConfirmPassword, ILoginRequest, IRegistrationDto, IResetItemRequest, IStatusResponse } from "../../../common/types/auth.types";
import { IAction } from "../../../common/types/common.types";
import { AsyncStorageService } from "../../../services/async-storage";
import { AuthService } from "../../../services/axios/auth";
import NavigationActions from "../../../services/navigation-service";
import { pushToastsAction } from "../../app";
import { AuthContactsEnum } from "../constants";

function* loginWorker({
    payload,
    type,
}: IAction<ILoginRequest>): SagaIterator {
    try {
        yield put(setAuthLoadingAction(true));
        const { data }: AxiosResponse<IStatusResponse, any> = yield call(
            AuthService.login,
            payload
        );

        if (data) {
            console.log("status", data.status)
            yield put(pushToastsAction({
                type: 'info',
                text1: 'Login successful',
                autoHide: true,
            }))
            NavigationActions.navigate(NavigationEnum.HOME_SCREEN)
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
        yield put(pushToastsAction({
            type: 'info',
            text1: error.response.data.status,
            autoHide: true,
        }))
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
        yield put(pushToastsAction({
            type: 'info',
            text1: error.response.data.status,
            autoHide: true,
        }))
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
                text1: 'Please check your email',
                autoHide: true,
            }))
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
}