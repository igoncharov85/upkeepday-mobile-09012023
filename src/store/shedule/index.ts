import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IGeneratedScheduleEntries, IScheduleItem, IWeekTimeSlot } from '../../common/types/schedule.types';

export interface ScheduleState {
    loading: boolean;
    GeneratedScheduleEntries: Array<IGeneratedScheduleEntries>,
    CurrentScheduledEntries: any[],
    WeekTimeSlots: Array<IWeekTimeSlot>,
    currentGeneratedScheduleItems: Array<IGeneratedScheduleEntries>
}

const initialState: ScheduleState = {
    loading: false,
    GeneratedScheduleEntries: [],
    CurrentScheduledEntries: [],
    WeekTimeSlots: [],
    currentGeneratedScheduleItems: [],
}

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        setScheduleLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setCurrentGeneratedScheduleAction: (state, action: PayloadAction<Array<IGeneratedScheduleEntries>>) => {
            state.currentGeneratedScheduleItems = action.payload
        },
        setTimeSlotsAction: (state, action: PayloadAction<Array<IWeekTimeSlot>>) => {
            state.WeekTimeSlots = action.payload
        },
        setGeneratedScheduleEntriesAction: (state, action: PayloadAction<Array<IGeneratedScheduleEntries>>) => {
            state.GeneratedScheduleEntries = action.payload
        },
    },

})

// Action creators are generated for each case reducer function
export const { setScheduleLoading, setGeneratedScheduleEntriesAction, setCurrentGeneratedScheduleAction, setTimeSlotsAction } = scheduleSlice.actions

export default scheduleSlice.reducer