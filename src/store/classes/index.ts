import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IClassesResponse, ISession, ISessionSubset } from '../../common/types/classes.types';

export interface IClassesState {
    loading: boolean;
    //USE for classes
    classes: Array<IClassesResponse>;
    finderClasses: Array<IClassesResponse>;
    currentSession: Array<ISession>;
    currentClass: IClassesResponse;
    generatedSessions: any
}

const initialState: IClassesState = {
    loading: false,
    classes: [],
    finderClasses: [],
    currentSession: [],
    currentClass: {} as IClassesResponse,
    generatedSessions: {},

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
            state.finderClasses = action.payload
        },
        setFinderClassesAction: (state, action: PayloadAction<Array<IClassesResponse>>) => {
            state.finderClasses = action.payload
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
    },

})

// Action creators are generated for each case reducer function
export const {
    setClassesLoading,
    setClassesAction,
    setSessinAction,
    addClassesAction,
    setClassAction,
    setCurrentSessionAction,
    setGenerateSessionAction,
    // setClassesScheduleAction,
    setFinderClassesAction } = classesService.actions

export default classesService.reducer