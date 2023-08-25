import { createSlice } from '@reduxjs/toolkit'
import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { ISchool } from './entities/ISchool';
import { ITeacher } from './entities/ITeacher';

interface IState {
    isLoading: boolean;
    schools: ISchool[];
    currentSchool: ISchool | null;
    isSelectAccount: boolean;
    currentTeachers: ITeacher[];
};

const initialState: IState = {
    isLoading: false,
    schools: [],
    currentSchool: null,
    isSelectAccount: false,
    currentTeachers: []
};

export const businessAccountSlice = createSlice({
    name: 'businessAccount',
    initialState,
    reducers: {
        setIsLoading: (state, payload: PayloadAction<boolean>) => {
            state.isLoading = payload.payload;
        },
        setSchools: (state, payload: PayloadAction<ISchool[]>) => {
            state.schools = payload.payload;
        },
        setCurrentSchools: (state, payload: PayloadAction<ISchool | null>) => {
            state.currentSchool = payload.payload;
        },
        setIsSelectAccount: (state, payload: PayloadAction<boolean>) => {
            state.isSelectAccount = payload.payload;
        },
        setCurrentTeachers: (state, payload: PayloadAction<ITeacher[]>) => {
            state.currentTeachers = payload.payload;
        },
        getState: (state) => {
            return state;
        },
    },

});

export const businessAccountActions = businessAccountSlice.actions;
export const businessAccountReducer = businessAccountSlice.reducer;