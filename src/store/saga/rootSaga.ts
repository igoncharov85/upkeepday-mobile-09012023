import { put, spawn } from "redux-saga/effects";
import { authWatcher } from "../auth/saga";
import { locationSagaWatcher } from "../location/saga";
import { scheduleWatcher } from "../shedule/saga";
import { userWatcher } from "../user/saga";
import { ClassesSagaWatcher } from "../classes/saga";
import { loggerActions } from "../logger";
import { businessAccountWatcher } from "../businessAccount/saga";

export default function* rootSaga(): Generator {
    try {
        yield spawn(authWatcher)
        yield spawn(scheduleWatcher)
        yield spawn(userWatcher)
        yield spawn(locationSagaWatcher)
        yield spawn(ClassesSagaWatcher)
        yield spawn(businessAccountWatcher)
    } catch (error) {
        console.warn("rootSaga: ", error);
        yield put(loggerActions.add({ type: 'error', name: 'rootSaga: ', message: error }));
    };
};