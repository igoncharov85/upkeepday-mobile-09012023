import { createAction } from "@reduxjs/toolkit";
import { UserContactsEnum } from "../constants";

export const fetchUserAction = createAction<null>(UserContactsEnum.FETCH_ALL_USERS)