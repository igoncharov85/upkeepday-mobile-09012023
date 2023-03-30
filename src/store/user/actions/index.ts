import { createAction } from "@reduxjs/toolkit";
import { IUserCreateRequest } from "../../../common/types/user";
import { UserContactsEnum } from "../constants";

export const fetchUsersAction = createAction<undefined>(UserContactsEnum.FETCH_ALL_USERS)
export const createUserAction = createAction<IUserCreateRequest>(UserContactsEnum.CREATE_USER)