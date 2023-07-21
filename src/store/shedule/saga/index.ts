import { AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import { setCurrentScheduleEntries, setGeneratedScheduleEntriesAction, setScheduleLoading, setTimeSlotsAction } from "..";
import { IAction } from "../../../common/types/common.types";
import { ICreateClassRequest, IDeleteScheduleRequest, IGeneratedScheduleResponse, IGenerateScheduleRequest, IScheduleItem, IScheduleRequest } from "../../../common/types/schedule.types";
import { ScheduleService } from "../../../services/axios/schedule";
import { ErrorFilterService } from "../../../services/error-filter/error-filter.service";
import { ScheduleConstantsEnum } from "../constants";
import { convertToLocaleTime } from "../../../services/utils/convertToUTC"

//TODO
export function* fetchSchedulesWorker({
  payload,
  type,
}: IAction<IScheduleRequest>): SagaIterator {
  try {
    yield put(setScheduleLoading(true));
    const { data }: AxiosResponse<Array<IScheduleItem>, any> = yield call(
      ScheduleService.fetchSchedule,
      payload
    );
    if (data) {
      //@ts-ignore
      yield put(setCurrentScheduleEntries(convertToLocaleTime(data)))
    }
  } catch (error) {
    yield call(ErrorFilterService.validateError, error)
  } finally {
    yield put(setScheduleLoading(false));
  }
}

//TODO
export function* generateScheduleWorker({
  payload,
  type,
}: IAction<IGenerateScheduleRequest>): SagaIterator {
  try {
    yield put(setScheduleLoading(true));
    yield put(setGeneratedScheduleEntriesAction([]))

    const { data }: AxiosResponse<IGeneratedScheduleResponse, any> = yield call(
      ScheduleService.generateScheduleEntry,
      payload
    );
    if (data) {
      yield put(setTimeSlotsAction(data.Slots))
      yield put(setGeneratedScheduleEntriesAction(data.GeneratedSessions))
      yield put(setCurrentScheduleEntries(convertToLocaleTime(data.CurrentSessions)))
    }

  } catch (error) {
    yield call(ErrorFilterService.validateError, error)
  } finally {
    yield put(setScheduleLoading(false));
  }
}

//TODO
export function* deleteScheduleByPeriodWorker({
  payload,
  type,
}: IAction<IDeleteScheduleRequest>): SagaIterator {
  try {
    yield put(setScheduleLoading(true));
    const { data }: AxiosResponse<Array<IGeneratedScheduleResponse>, any> = yield call(
      ScheduleService.deleteSchedules,
      payload
    );
  } catch (error) {
    yield call(ErrorFilterService.validateError, error)
  } finally {
    yield put(setScheduleLoading(false));
  }
}

//TODO
export function* createSchedule({
  payload,
  type,
}: IAction<ICreateClassRequest>): SagaIterator {
  try {
    yield put(setScheduleLoading(true));
    const { data }: AxiosResponse<Array<IGeneratedScheduleResponse>, any> = yield call(
      ScheduleService.createClass,
      payload
    );
  } catch (error) {
    yield call(ErrorFilterService.validateError, error)
  }
  finally {

    yield put(setScheduleLoading(false));

  }
}

export function* scheduleWatcher() {
  yield takeEvery(ScheduleConstantsEnum.FETCH_SCHEDULES_BY_PERIOD, fetchSchedulesWorker)
  yield takeEvery(ScheduleConstantsEnum.GENERATE_SCHEDULE_ENTRY, generateScheduleWorker)
  yield takeEvery(ScheduleConstantsEnum.DELETE_SCHEDULE_BY_PERIOD, deleteScheduleByPeriodWorker)
  yield takeEvery(ScheduleConstantsEnum.CREATE_CLASS, createSchedule)
}