import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IClassesResponse, ISession } from '../../common/types/classes.types';

export interface IClassesState {
    loading: boolean;
    //USE for classes
    classes: Array<IClassesResponse>;
    currentSession: Array<ISession>;
}

const initialState: IClassesState = {
    loading: false,
    classes: [],
    currentSession: [],
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
    },

})

// Action creators are generated for each case reducer function
export const { setClassesLoading, setClassesAction, setSessinAction, addClassesAction } = classesService.actions

export default classesService.reducer