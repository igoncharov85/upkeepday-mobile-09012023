import { createAction } from "@reduxjs/toolkit";
import { ClassesConstantsEnum } from "../constants";
import { IClassesEditName, IClassesUpdateSession, IClassesUpdateStatus, IGeneratedClasses, IGeneratedClassesRequest, TClassesId, TClassesStatus } from "../../../common/types/classes.types";


export const fetchClassesAction = createAction<{ status: TClassesStatus, schoolId?: number }>(ClassesConstantsEnum.FETCH_CLASEES)
export const fetchClassesByIdAction = createAction<{ id: TClassesId, schoolId?: number }>(ClassesConstantsEnum.FETCH_CLASEES_BY_ID)
export const fetchGeneratedClassesAction = createAction<(IGeneratedClasses)>(ClassesConstantsEnum.FETCH_GENERATED_CLASSES)
export const PatchClassesAction = createAction<(IGeneratedClassesRequest)>(ClassesConstantsEnum.FETCH_PATCH_GENERATED_CLASSES)

export const fetchSessionClassesByIdAction = createAction<{ id: TClassesId, schoolId?: number }>(ClassesConstantsEnum.FETCH_SESSION_CLASEES_BY_ID)
export const deleteClassesAction = createAction<{ id: TClassesId; schoolId?: number }>(ClassesConstantsEnum.DELETE_CLASEES)
export const updatedStatusClassesAction = createAction<IClassesUpdateStatus>(ClassesConstantsEnum.UPDATE_STATUS_CLASEES)
export const updatedSessionClassesAction = createAction<IClassesUpdateSession>(ClassesConstantsEnum.UPDATE_CLASEES_SESSION)
export const deleteSessionClassesAction = createAction<{ id: TClassesId; schoolId?: number }>(ClassesConstantsEnum.DELETE_CLASEES_SESSION)
export const editNameClassesAction = createAction<{data: IClassesEditName, schoolId?: number }>(ClassesConstantsEnum.EDIT_CLASS_NAME)