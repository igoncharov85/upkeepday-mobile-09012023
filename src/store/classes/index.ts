import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IClassesResponse, ISession, ISessionSubset, IclassesScheduleResponse } from '../../common/types/classes.types';

export interface IClassesState {
    loading: boolean;
    //USE for classes
    classes: Array<IClassesResponse>;
    currentSession: Array<ISession>;
    currentClass: IClassesResponse;
    generatedSessions: any;
    classesSchedule: IclassesScheduleResponse
}

const initialState: IClassesState = {
    loading: false,
    classes: [],
    currentSession: [],
    currentClass: {} as IClassesResponse,
    generatedSessions: {},
    classesSchedule: {
        StartDate: '',
        EndDate: '',
        Sessions: [],
        OtherSessions: []
    }

}

export const classesService = createSlice({
    name: 'classes',
    initialState,
    reducers: {
        setClassesLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setClassesAction: (state, action: PayloadAction<Array<IClassesResponse>>) => {
            state.classes = action.payload
        },
        setSessinAction: (state, action: PayloadAction<Array<ISession>>) => {
            state.currentSession = action.payload
        },
        addClassesAction: (state, action: PayloadAction<IClassesResponse>) => {
            state.classes = [action.payload, ...state.classes]
        },
        setClassAction: (state, action: PayloadAction<IClassesResponse>) => {
            state.currentClass = action.payload
        },
        setCurrentSessionAction: (state, action: PayloadAction<any>) => {
            state.currentSession = action.payload

        },
        setGenerateSessionAction: (state, action: PayloadAction<any>) => {
            state.generatedSessions = action.payload

        },
        setClassesScheduleAction: (state, action: PayloadAction<IclassesScheduleResponse>) => {
            state.classesSchedule = action.payload

        },
    },

})

// Action creators are generated for each case reducer function
export const { setClassesLoading, setClassesAction, setSessinAction, addClassesAction, setClassAction, setCurrentSessionAction, setGenerateSessionAction, setClassesScheduleAction } = classesService.actions

export default classesService.reducer