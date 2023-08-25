import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ISchool } from '../businessAccount/entities/ISchool';
import { ITeacher } from '../businessAccount/entities/ITeacher';
import { IBusinessAccountForm } from './entities/IBusinessAccountForm';
import { put } from 'redux-saga/effects';
import { pushToastsAction } from '../app';
import { dispatch } from '../store';

const initialState: IBusinessAccountForm = {
    School: {
        BusinessName: '',
        Phone: '',
        AddressLine1: '',
        Country: '',
        City: '',
        State: '',
        PostalCode: '',
    },
    Teachers: [],
};

export const businessAccountFormSlice = createSlice({
    name: 'businessAccountForm',
    initialState,
    reducers: {
        fillForm: (state, payload: PayloadAction<ISchool>) => {
            state.School = payload.payload;
        },
        addTeacher: (state, payload: PayloadAction<ITeacher>) => {
            state.Teachers.push(payload.payload);
        },
        deleteTeacher: (state, payload: PayloadAction<ITeacher>) => {
            console.log(payload.payload)
            state.Teachers = state.Teachers.filter(item => item.Phone !== payload.payload.Phone);
        },
        clearTeachers: (state) => {
            state.Teachers = initialState.Teachers;
        },
        clear: (state) => {
            state.Teachers = initialState.Teachers;
            state.School = initialState.School;
        },
    },

});

export const businessAccountFormActions = businessAccountFormSlice.actions;
export const businessAccountFormReducer = businessAccountFormSlice.reducer;