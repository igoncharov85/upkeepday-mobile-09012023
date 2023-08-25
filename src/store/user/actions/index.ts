import { createAction } from "@reduxjs/toolkit";
import { IUserCreateRequest, ICheckinsId, IUserCheckinsRequest, IDeleteUserRequest, IUpdateStudent, IStudentsRequest, IStudentRequest, IStudent } from "../../../common/types/user";
import { UserContactsEnum } from "../constants";


//Use for get list of students
export const fetchUsersAction = createAction<{ schoolId?: number }>(UserContactsEnum.FETCH_ALL_USERS)
export const fetchUsersByIdAction = createAction<{ sessionId: ICheckinsId, schoolId?: number }>(UserContactsEnum.FETCH_USERS_BY_ID)
//Use for add student
export const createUserAction = createAction<{ data: IUserCreateRequest, schoolId?: number }>(UserContactsEnum.CREATE_USER)
export const fetchCheckinsUserAction = createAction<{ sessionId: ICheckinsId, schoolId?: number }>(UserContactsEnum.FETCH_CHECKINS_USER)
export const checkinsUserAction = createAction<IUserCheckinsRequest>(UserContactsEnum.CHECKIN_USERS)
export const deleteUserAction = createAction<IDeleteUserRequest>(UserContactsEnum.DELETE_USER)

export const updateUserAction = createAction<IUpdateStudent>(UserContactsEnum.UPDATE_USER)

export const deleteStudentAction = createAction<IStudentRequest>(UserContactsEnum.DELETE_STUDENTS)
export const fetchStudentsAction = createAction<IStudentsRequest>(UserContactsEnum.FETCH_STUDENTS_BY_STATUS)
export const fetchStudentsByIdAction = createAction<IStudentRequest>(UserContactsEnum.FETCH_STUDENTS_BY_ID)
export const updateStudentAction = createAction<(IStudentRequest & IStudent)>(UserContactsEnum.UPDATE_STUDENTS)
export const updateStudentStatus = createAction<(IStudentRequest & IStudentsRequest)>(UserContactsEnum.UPDATE_STUDENTS_STATUS)