import { createAction } from "@reduxjs/toolkit";
import { BusinessAccountContactsEnum } from "../constants";
import { IBusinessAccountForm } from "../../businessAccountForm/entities/IBusinessAccountForm";

export const createSchoolAction = createAction<IBusinessAccountForm>(BusinessAccountContactsEnum.CREATE_SCHOOL);
export const getSchoolsAction = createAction(BusinessAccountContactsEnum.GET_SCHOOLS);
export const getSchoolTeachersAction = createAction<number>(BusinessAccountContactsEnum.GET_SCHOOL_TEACHERS);