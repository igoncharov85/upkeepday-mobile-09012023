import { AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import { setScheduleLoading } from "..";
import { IAction } from "../../../common/types/common.types";
import { IScheduleItem, IScheduleRequest } from "../../../common/types/schedule.types";
import { ScheduleService } from "../../../services/axios/schedule";
import { ErrorFilterService } from "../../../services/error-filter/error-filter.service";
import { ScheduleConstantsEnum } from "../constants";


export function* fetchSchedulesWatcher({
    payload,
    type,
}: IAction<IScheduleRequest>):SagaIterator {
   try{
    yield put(setScheduleLoading(true));
    const { data }: AxiosResponse<Array<IScheduleItem>, any> = yield call(
        ScheduleService.fetchSchedule,
        payload
    );
    console.log("data: ", data)
   }catch(error){
    yield call(ErrorFilterService.validateError, error)
   }
}
export function* scheduleWatcher(){
  yield takeEvery(ScheduleConstantsEnum.FETCH_SCHEDULES_BY_PERIOD, fetchSchedulesWatcher)
}