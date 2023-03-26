import { spawn } from "redux-saga/effects";
import { authWatcher } from "../auth/saga";
import { locationSagaWatcher } from "../location/saga";
import { scheduleWatcher } from "../shedule/saga";
import { userWatcher } from "../user/saga";

export default function* rootSaga(): Generator {
    try {
        yield spawn(authWatcher)
        yield spawn(scheduleWatcher)
        yield spawn(locationSagaWatcher)
        yield spawn(userWatcher)
    } catch (error) {
        console.warn("Error in rootSaga", error);
    }
}