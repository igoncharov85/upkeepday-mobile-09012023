import { createAction } from "@reduxjs/toolkit";
import { ClassesConstantsEnum } from "../constants";
import { IClassId, IClassesEditName, IClassesUpdateSession, IClassesUpdateStatus, IDeleteSession, IGeneratedClasses, IGeneratedClassesRequest, TClassesId, TClassesStatus } from "../../../common/types/classes.types";


export const fetchClassesAction = createAction<TClassesStatus>(ClassesConstantsEnum.FETCH_CLASEES)
export const fetchClassesByIdAction = createAction<TClassesId>(ClassesConstantsEnum.FETCH_CLASEES_BY_ID)
export const fetchGeneratedClassesAction = createAction<(IGeneratedClasses)>(ClassesConstantsEnum.FETCH_GENERATED_CLASSES)
export const PatchClassesAction = createAction<(IGeneratedClassesRequest)>(ClassesConstantsEnum.FETCH_PATCH_GENERATED_CLASSES)

export const fetchSessionClassesByIdAction = createAction<TClassesId>(ClassesConstantsEnum.FETCH_SESSION_CLASEES_BY_ID)
export const deleteClassesAction = createAction<TClassesId>(ClassesConstantsEnum.DELETE_CLASEES)
export const updatedStatusClassesAction = createAction<IClassesUpdateStatus>(ClassesConstantsEnum.UPDATE_STATUS_CLASEES)
export const updatedSessionClassesAction = createAction<IClassesUpdateSession>(ClassesConstantsEnum.UPDATE_CLASEES_SESSION)

export const deleteSessionClassesAction = createAction<IDeleteSession>(ClassesConstantsEnum.DELETE_CLASEES_SESSION)

export const editNameClassesAction = createAction<IClassesEditName>(ClassesConstantsEnum.EDIT_CLASS_NAME)
export const fetchClassesSchedule = createAction<IClassId>(ClassesConstantsEnum.FETCH_CLASSES_SCHEDULE)