import { createAction } from "@reduxjs/toolkit";
import { IConfirmPassword, ILoginRequest, IRegistrationDto, IResetItemRequest } from "../../../common/types/auth.types";
import { AuthContactsEnum } from "../constants";

export const loginAction = createAction<ILoginRequest>(AuthContactsEnum.LOGIN)
export const registrationAction = createAction<IRegistrationDto>(AuthContactsEnum.REGISTRATION)
export const logoutAction = createAction<undefined>(AuthContactsEnum.LOGOUT)
export const confirmRegistrationPasswordAction = createAction<IConfirmPassword>(AuthContactsEnum.CONFIRM_REGISTRATION_PASSWORD)
export const resetPasswordSendEmailAction = createAction<string>(AuthContactsEnum.RESET_PASSWORD_SEND_EMAIL)
export const resetPasswordResetAction = createAction<IConfirmPassword>(AuthContactsEnum.RESET_PASSWORD_NEW_PASSWORD)
export const fetchCountriesAction = createAction<undefined>(AuthContactsEnum.GET_COUNTRIES)
export const fetchStatesAction = createAction<string>(AuthContactsEnum.GET_STATES)
export const getUserAction = createAction(AuthContactsEnum.GET_USER)