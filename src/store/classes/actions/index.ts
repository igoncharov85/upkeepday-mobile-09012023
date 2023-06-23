import { createAction } from "@reduxjs/toolkit";
import { ClassesConstantsEnum } from "../constants";
import { IClassesUpdateSession, IClassesUpdateStatus, TClassesId, TClassesStatus } from "../../../common/types/classes.types";


export const fetchClassesAction = createAction<TClassesStatus>(ClassesConstantsEnum.FETCH_CLASEES)
export const fetchClassesByIdAction = createAction<TClassesId>(ClassesConstantsEnum.FETCH_CLASEES_BY_ID)
export const deleteClassesAction = createAction<TClassesId>(ClassesConstantsEnum.DELETE_CLASEES)
export const updatedStatusClassesAction = createAction<IClassesUpdateStatus>(ClassesConstantsEnum.UPDATE_STATUS_CLASEES)
export const updatedSessionClassesAction = createAction<IClassesUpdateSession>(ClassesConstantsEnum.UPDATE_CLASEES_SESSION)
export const deleteSessionClassesAction = createAction<TClassesId>(ClassesConstantsEnum.DELETE_CLASEES_SESSION)