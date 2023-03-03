import { spawn } from "redux-saga/effects";
import { authWatcher } from "../auth/saga";

export default function* rootSaga(): Generator {
    try {
        yield spawn(authWatcher)
    } catch (error) {
        console.warn("Error in rootSaga", error);
    }
}