import { AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import { setScheduleLoading } from "..";
import { IAction } from "../../../common/types/common.types";
import { IGeneratedScheduleResponse, IGenerateScheduleRequest, IScheduleItem, IScheduleRequest } from "../../../common/types/schedule.types";
import { ScheduleService } from "../../../services/axios/schedule";
import { ErrorFilterService } from "../../../services/error-filter/error-filter.service";
import { ScheduleConstantsEnum } from "../constants";

//TODO
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

//TODO
export function* generateScheduleWatcher({
  payload,
  type,
}: IAction<IGenerateScheduleRequest>):SagaIterator {
 try{
  yield put(setScheduleLoading(true));
  const { data }: AxiosResponse<Array<IGeneratedScheduleResponse>, any> = yield call(
      ScheduleService.generateScheduleEntry,
      payload
  );
  console.log("data: ", data)
 }catch(error){
  yield call(ErrorFilterService.validateError, error)
 }
}

//TODO
export function* deleteScheduleByPeriodWatcher({
  payload,
  type,
}: IAction<IScheduleRequest>):SagaIterator {
 try{
  yield put(setScheduleLoading(true));
  const { data }: AxiosResponse<Array<IGeneratedScheduleResponse>, any> = yield call(
      ScheduleService.deleteSchedules,
      payload
  );
  console.log("data: ", data)
 }catch(error){
  yield call(ErrorFilterService.validateError, error)
 }
}

//TODO
export function* createSchedule({
  payload,
  type,
}: IAction<IScheduleRequest>):SagaIterator {
 try{
  yield put(setScheduleLoading(true));
  const { data }: AxiosResponse<Array<IGeneratedScheduleResponse>, any> = yield call(
      ScheduleService.createClass,
      payload
  );
  console.log("data: ", data)
 }catch(error){
  yield call(ErrorFilterService.validateError, error)
 }
}

export function* scheduleWatcher(){
  yield takeEvery(ScheduleConstantsEnum.FETCH_SCHEDULES_BY_PERIOD, fetchSchedulesWatcher)
  yield takeEvery(ScheduleConstantsEnum.GENERATE_SCHEDULE_ENTRY, generateScheduleWatcher)
  yield takeEvery(ScheduleConstantsEnum.DELETE_SCHEDULE_BY_PERIOD, deleteScheduleByPeriodWatcher)
  yield takeEvery(ScheduleConstantsEnum.CREATE_CLASS, createSchedule)
}