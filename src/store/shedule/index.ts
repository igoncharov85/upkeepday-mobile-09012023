import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICreateClassRequest, IGeneratedScheduleEntries, IScheduleItem, IWeekTimeSlot } from '../../common/types/schedule.types';
import moment from 'moment';

export interface ScheduleState {
    loading: boolean;
    //schedule that generate on current itteration mutable
    GeneratedScheduleEntries: Array<IGeneratedScheduleEntries>,
    //week time slots that came from request 
    WeekTimeSlots: Array<IWeekTimeSlot>,
    //schedule that already exists immutable
    CurrentScheduledEntries: Array<IGeneratedScheduleEntries>,
    //for data collection
    createCurrentClassRequest: Partial<ICreateClassRequest>,
}

const initialState: ScheduleState = {
    loading: false,
    GeneratedScheduleEntries: [],
    CurrentScheduledEntries: [],
    WeekTimeSlots: [],
    createCurrentClassRequest: {},
}

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        setScheduleLoading: (state, action: PayloadAction<boolean>) => {
            // const time = Date.now();
            // console.log('\n----loading----\n', action.payload, ' - loading status\n', moment(time).format('HH:mm:ss.SSS'), ' - time set loading')

            state.loading = action.payload
        },
        setTimeSlotsAction: (state, action: PayloadAction<Array<IWeekTimeSlot>>) => {
            state.WeekTimeSlots = action.payload
        },
        setGeneratedScheduleEntriesAction: (state, action: PayloadAction<Array<IGeneratedScheduleEntries>>) => {
            state.GeneratedScheduleEntries = action.payload
        },
        setCurrentScheduleEntries: (state, action: PayloadAction<Array<IGeneratedScheduleEntries>>) => {
            state.CurrentScheduledEntries = action.payload
        },
        updateCurrentClassRequestAction: (state, action: PayloadAction<Partial<ICreateClassRequest>>) => {
            state.createCurrentClassRequest = {
                ...state.createCurrentClassRequest,
                ...action.payload,
                Class: {
                    ...state.createCurrentClassRequest.Class,
                    ...(action.payload.Class || {})
                },
                Location: {
                    ...state.createCurrentClassRequest.Location,
                    ...(action.payload.Location || {})
                }
            }
        },
    },

})

// Action creators are generated for each case reducer function
export const { setScheduleLoading, setGeneratedScheduleEntriesAction, setCurrentScheduleEntries, setTimeSlotsAction, updateCurrentClassRequestAction } = scheduleSlice.actions

export default scheduleSlice.reducer