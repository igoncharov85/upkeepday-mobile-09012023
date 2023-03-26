import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ILocation } from '../../common/types/location';

export interface ILocationState {
    loading: boolean;
    locations: Array<ILocation>
}

const initialState: ILocationState = {
    loading: false,
    locations: []
}

export const locationService = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        setLocationLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setLocationsAction: (state, action: PayloadAction<Array<ILocation>>) => {
            state.locations = action.payload
        },
        addLocationsAction: (state, action: PayloadAction<ILocation>) => {
            state.locations = [action.payload ,...state.locations]
        },
    },

})

// Action creators are generated for each case reducer function
export const { setLocationLoading, setLocationsAction,addLocationsAction } = locationService.actions

export default locationService.reducer