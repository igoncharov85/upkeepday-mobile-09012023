import { createAction } from "@reduxjs/toolkit";
import { IUserCreateRequest } from "../../../common/types/user";
import { UserContactsEnum } from "../constants";


//Use for get list of students
export const fetchUsersAction = createAction<undefined>(UserContactsEnum.FETCH_ALL_USERS)
//Use for add student
export const createUserAction = createAction<IUserCreateRequest>(UserContactsEnum.CREATE_USER)