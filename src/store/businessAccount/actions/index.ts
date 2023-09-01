import { createAction } from "@reduxjs/toolkit";
import { BusinessAccountContactsEnum } from "../constants";
import { IBusinessAccountForm } from "../../businessAccountForm/entities/IBusinessAccountForm";
import { IStudent, IUpdateStudent } from "../../../common/types/user";

export const createSchoolAction = createAction<IBusinessAccountForm>(BusinessAccountContactsEnum.CREATE_SCHOOL);
export const getSchoolsAction = createAction(BusinessAccountContactsEnum.GET_SCHOOLS);
export const getSchoolTeachersAction = createAction(BusinessAccountContactsEnum.GET_SCHOOL_TEACHERS);
export const getSchoolStudentsAction = createAction(BusinessAccountContactsEnum.GET_SCHOOL_STUDENTS);
export const editSchoolTeacherAction = createAction(BusinessAccountContactsEnum.EDIT_SCHOOL_TEACHERS);
export const deleteSchoolTeacherAction = createAction(BusinessAccountContactsEnum.DELETE_SCHOOL_TEACHERS);
export const updateSchoolClassStudentsAction = createAction<{ ExistingStudents: number[], NewStudents: Array<IStudent>}>(BusinessAccountContactsEnum.UPDATE_SCHOOL_CLASS_STUDENTS);
export const getSchoolClassStudentsAction = createAction(BusinessAccountContactsEnum.GET_SCHOOL_CLASS_STUDENTS);

