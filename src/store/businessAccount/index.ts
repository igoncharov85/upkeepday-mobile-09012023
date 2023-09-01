import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ISchool } from './entities/ISchool';
import { ITeacher } from './entities/ITeacher';
import { IStudentResponse } from '../../common/types/user';
import { RootState } from '../store';
import { IClassesResponse } from '../../common/types/classes.types';

interface IState {
    isLoading: boolean;
    isEdit: boolean;
    schools: ISchool[];
    currentSchool: ISchool | null;
    currentClass: IClassesResponse | null;
    isSelectAccount: boolean;
    classTeachers: ITeacher[];
    schoolTeachers: ITeacher[];
    editingTeacher: ITeacher | null;
    schoolStudents: IStudentResponse[];
    classStudents: IStudentResponse[];
};

const initialState: IState = {
    isLoading: false,
    isEdit: false,
    schools: [],
    currentSchool: null,
    currentClass: null,
    isSelectAccount: false,
    classTeachers: [],
    schoolTeachers: [],
    editingTeacher: null,
    schoolStudents: [],
    classStudents: [],
};

export const businessAccountSlice = createSlice({
    name: 'businessAccount',
    initialState,
    reducers: {
        setIsLoading: (state, payload: PayloadAction<boolean>) => {
            state.isLoading = payload.payload;
        },
        setIsEdit: (state, payload: PayloadAction<boolean>) => {
            state.isEdit = payload.payload;
        },
        setSchools: (state, payload: PayloadAction<ISchool[]>) => {
            state.schools = payload.payload;
        },
        setCurrentSchools: (state, payload: PayloadAction<ISchool | null>) => {
            state.currentSchool = payload.payload;
        },
        setCurrentClass: (state, payload: PayloadAction<IClassesResponse | null>) => {
            state.currentClass = payload.payload;
        },
        setIsSelectAccount: (state, payload: PayloadAction<boolean>) => {
            state.isSelectAccount = payload.payload;
        },
        setClassTeachers: (state, payload: PayloadAction<ITeacher[]>) => {
            state.classTeachers = payload.payload;
        },
        setSchoolTeachers: (state, payload: PayloadAction<ITeacher[]>) => {
            state.schoolTeachers = payload.payload;
        },
        setEditingTeacher: (state, payload: PayloadAction<ITeacher>) => {
            state.editingTeacher = payload.payload;
        },
        setSchoolStudents: (state, payload: PayloadAction<IStudentResponse[]>) => {
            state.schoolStudents = payload.payload;
        },
        setClassStudents: (state, payload: PayloadAction<IStudentResponse[]>) => {
            state.classStudents = payload.payload;
        },
    },

});

export const businessAccountActions = businessAccountSlice.actions;
export const businessAccountReducer = businessAccountSlice.reducer;

export const selectBusinessAccount = createSelector(
    [(state: RootState) => state],
    (state): IState => state.businessAccount
);