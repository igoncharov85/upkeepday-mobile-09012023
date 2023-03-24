import { createAction } from "@reduxjs/toolkit";
import { IScheduleRequest } from "../../../common/types/schedule.types";
import { ScheduleConstantsEnum } from "../constants";

export const fetchScheduleByPeriodAction = createAction<IScheduleRequest>(ScheduleConstantsEnum.FETCH_SCHEDULES_BY_PERIOD)