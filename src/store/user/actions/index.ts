import { createAction } from "@reduxjs/toolkit";
import { IUserCreateRequest, ICheckinsId, IUserCheckinsRequest, IDeleteUserRequest, IUpdateStudent, IStudentsRequest, IStudentRequest, IStudent, IPaymentsTableParams, IStudentPaymentRequest } from "../../../common/types/user";
import { UserContactsEnum } from "../constants";


//Use for get list of students
export const fetchUsersAction = createAction<undefined>(UserContactsEnum.FETCH_ALL_USERS)
export const fetchUsersByIdAction = createAction<ICheckinsId>(UserContactsEnum.FETCH_USERS_BY_ID)
//Use for add student
export const createUserAction = createAction<IUserCreateRequest>(UserContactsEnum.CREATE_USER)
export const fetchCheckinsUserAction = createAction<ICheckinsId>(UserContactsEnum.FETCH_CHECKINS_USER)
export const checkinsUserAction = createAction<ICheckinsId & IUserCheckinsRequest>(UserContactsEnum.CHECKIN_USERS)
export const deleteUserAction = createAction<IDeleteUserRequest>(UserContactsEnum.DELETE_USER)

export const updateUserAction = createAction<IUpdateStudent>(UserContactsEnum.UPDATE_USER)

export const deleteStudentAction = createAction<IStudentRequest>(UserContactsEnum.DELETE_STUDENTS)
export const fetchStudentsAction = createAction<IStudentsRequest>(UserContactsEnum.FETCH_STUDENTS_BY_STATUS)
export const fetchStudentsByIdAction = createAction<IStudentRequest>(UserContactsEnum.FETCH_STUDENTS_BY_ID)
export const updateStudentAction = createAction<(IStudentRequest & IStudent)>(UserContactsEnum.UPDATE_STUDENTS)
export const updateStudentStatus = createAction<(IStudentRequest & IStudentsRequest)>(UserContactsEnum.UPDATE_STUDENTS_STATUS)
export const fetchStudentPaymentsAction = createAction<IPaymentsTableParams>(UserContactsEnum.FETCH_STUDENT_PAYMENTS)
export const sendStudentPaymentAction = createAction<IStudentPaymentRequest>(UserContactsEnum.SEND_STUDENT_PAYMENT)