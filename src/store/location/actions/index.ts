import { createAction } from "@reduxjs/toolkit";
import { IIdRequest, ILocationRequest } from "../../../common/types/location";
import { LocationConstantsEnum } from "../constants";


export const fetchLocationAction = createAction<undefined>(LocationConstantsEnum.FETCH_LOCATIONS)
export const addLocationAction = createAction<ILocationRequest>(LocationConstantsEnum.ADD_LOCATION)
export const fetchLOcationById = createAction<IIdRequest>(LocationConstantsEnum.GET_LOCATION_BY_ID)