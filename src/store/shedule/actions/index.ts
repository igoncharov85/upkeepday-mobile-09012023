import { createAction } from "@reduxjs/toolkit";
import { ICreateClassRequest, IGenerateScheduleRequest, IScheduleRequest } from "../../../common/types/schedule.types";
import { ScheduleConstantsEnum } from "../constants";

export const fetchScheduleByPeriodAction = createAction<IScheduleRequest>(ScheduleConstantsEnum.FETCH_SCHEDULES_BY_PERIOD)
export const deleteScheduleByPeriodAction = createAction<IScheduleRequest>(ScheduleConstantsEnum.DELETE_SCHEDULE_BY_PERIOD)
// Use for POST /schedule/generate_schedule_entry
export const generateScheduleAction = createAction<IGenerateScheduleRequest>(ScheduleConstantsEnum.GENERATE_SCHEDULE_ENTRY)
// Use for POST /tutor/classes/ finish
export const createScheduleAction = createAction<ICreateClassRequest>(ScheduleConstantsEnum.CREATE_CLASS)