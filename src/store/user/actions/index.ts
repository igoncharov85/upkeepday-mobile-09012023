import { createAction } from "@reduxjs/toolkit";
import { IUserCheckins, IUserCreateRequest, ICheckinsId, IUserCheckinsRequest, IDeleteUserRequest, IUpdateStudent } from "../../../common/types/user";
import { UserContactsEnum } from "../constants";


//Use for get list of students
export const fetchUsersAction = createAction<undefined>(UserContactsEnum.FETCH_ALL_USERS)
//Use for add student
export const createUserAction = createAction<IUserCreateRequest>(UserContactsEnum.CREATE_USER)
export const fetchCheckinsUserAction = createAction<ICheckinsId>(UserContactsEnum.FETCH_CHECKINS_USER)
export const checkinsUserAction = createAction<ICheckinsId & IUserCheckinsRequest>(UserContactsEnum.CHECKIN_USERS)
export const deleteUserAction = createAction<IDeleteUserRequest>(UserContactsEnum.DELETE_USER)
export const updateUserAction = createAction<IUpdateStudent>(UserContactsEnum.UPDATE_USER)