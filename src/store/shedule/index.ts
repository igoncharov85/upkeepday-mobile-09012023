import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ScheduleState {
    loading: boolean;

}

const initialState: ScheduleState = {
    loading: false,
}

export const scheduleSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setScheduleLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
    },

})

// Action creators are generated for each case reducer function
export const { setScheduleLoading } = scheduleSlice.actions

export default scheduleSlice.reducer