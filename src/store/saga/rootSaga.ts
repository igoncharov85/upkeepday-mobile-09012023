import { spawn } from "redux-saga/effects";
import { authWatcher } from "../auth/saga";
import { scheduleWatcher } from "../shedule/saga";

export default function* rootSaga(): Generator {
    try {
        yield spawn(authWatcher)
        yield spawn(scheduleWatcher)
    } catch (error) {
        console.warn("Error in rootSaga", error);
    }
}