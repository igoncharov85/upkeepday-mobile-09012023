import { AxiosResponse } from "axios";
import { SagaIterator } from "redux-saga";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { setCurrentScheduleEntries, setGeneratedScheduleEntriesAction, setScheduleLoading, setTimeSlotsAction } from "..";
import { IAction } from "../../../common/types/common.types";
import { ICreateClassRequest, IDeleteScheduleRequest, IGeneratedScheduleResponse, IGenerateScheduleRequest, IScheduleItem, IScheduleRequest } from "../../../common/types/schedule.types";
import { ScheduleService } from "../../../services/axios/schedule";
import { ErrorFilterService } from "../../../services/error-filter/error-filter.service";
import { ScheduleConstantsEnum } from "../constants";
import { convertToLocaleTime } from "../../../services/utils/convertToUTC"
import { loggerActions } from "../../logger";

//TODO
export function* fetchSchedulesWorker({ payload }: IAction<IScheduleRequest>): SagaIterator {
  try {
    yield put(setScheduleLoading(true));
    const startDate = Date.now();
    const { data }: AxiosResponse<Array<IScheduleItem>, any> = yield call(ScheduleService.fetchSessions, payload);
    yield put(loggerActions.add({ type: 'response', name: 'fetchSchedulesWorker: ', message: data }));
    if (data) {
      const endDate = Date.now();
      // console.log('\n start request time: ', moment(startDate).format('HH:mm:ss.SSS'), '\n get response time: ', moment(endDate).format('HH:mm:ss.SSS'))
      // console.log(timeDifference, 'timeDifference ssss');
      //@ts-ignore
      yield put(setCurrentScheduleEntries(convertToLocaleTime(data)))
    };
  } catch (error) {
    console.warn("fetchSchedulesWorker: ", error);
    yield put(loggerActions.add({ type: 'error', name: 'fetchSchedulesWorker: ', message: error }));
    yield call(ErrorFilterService.validateError, error);
  } finally {
    yield put(setScheduleLoading(false));
  };
};

//TODO
export function* generateScheduleWorker({ payload }: IAction<IGenerateScheduleRequest>): SagaIterator {
  try {
    yield put(setScheduleLoading(true));
    const { currentSchool } = yield select(state => state.businessAccount);
    console.log('generateScheduleWorker -> currentSchool: ', currentSchool);
    yield put(setGeneratedScheduleEntriesAction([]));
    const { data }: AxiosResponse<IGeneratedScheduleResponse, any> = yield call(ScheduleService.generateSessions, { data: payload, schoolId: currentSchool?.SchoolId || undefined });
    yield put(loggerActions.add({ type: 'response', name: 'generateScheduleWorker: ', message: data }));
    if (data) {
      yield put(setTimeSlotsAction(data.Slots))
      yield put(setGeneratedScheduleEntriesAction(data.GeneratedSessions))
      yield put(setCurrentScheduleEntries(convertToLocaleTime(data.CurrentSessions)))
    };
  } catch (error) {
    console.warn("generateScheduleWorker: ", error);
    yield put(loggerActions.add({ type: 'error', name: 'generateScheduleWorker: ', message: error }));
    yield call(ErrorFilterService.validateError, error)
  } finally {
    yield put(setScheduleLoading(false));
  };
};

//TODO
export function* deleteScheduleByPeriodWorker({ payload }: IAction<IDeleteScheduleRequest>): SagaIterator {
  try {
    yield put(setScheduleLoading(true));
    const { currentSchool } = yield select(state => state.businessAccount);
    const { data }: AxiosResponse<Array<IGeneratedScheduleResponse>, any> = yield call(ScheduleService.deleteSessions, payload);
    yield put(loggerActions.add({ type: 'response', name: 'deleteScheduleByPeriodWorker: ', message: data }));
  } catch (error) {
    console.warn("deleteScheduleByPeriodWorker: ", error);
    yield put(loggerActions.add({ type: 'error', name: 'deleteScheduleByPeriodWorker: ', message: error }));
    yield call(ErrorFilterService.validateError, error)
  } finally {
    yield put(setScheduleLoading(false));
  };
};

//TODO
export function* createSchedule({ payload }: IAction<ICreateClassRequest>): SagaIterator {
  try {
    yield put(setScheduleLoading(true));
    const { currentSchool } = yield select(state => state.businessAccount);
    const { data }: AxiosResponse<Array<IGeneratedScheduleResponse>, any> = yield call(ScheduleService.createClass, { data: payload, schoolId: currentSchool?.SchoolId });
    yield put(loggerActions.add({ type: 'response', name: 'createSchedule: ', message: data }));
  } catch (error) {
    console.warn("createSchedule: ", error);
    yield put(loggerActions.add({ type: 'error', name: 'createSchedule: ', message: error }));
    yield call(ErrorFilterService.validateError, error)
  } finally {
    yield put(setScheduleLoading(false));
  };
};

export function* scheduleWatcher() {
  yield takeEvery(ScheduleConstantsEnum.FETCH_SCHEDULES_BY_PERIOD, fetchSchedulesWorker)
  yield takeEvery(ScheduleConstantsEnum.GENERATE_SCHEDULE_ENTRY, generateScheduleWorker)
  yield takeEvery(ScheduleConstantsEnum.DELETE_SCHEDULE_BY_PERIOD, deleteScheduleByPeriodWorker)
  yield takeEvery(ScheduleConstantsEnum.CREATE_CLASS, createSchedule)
};