import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBusinessClassForm, IClassLocation } from './entities/IBusinessClassForm';
import { IClass } from './entities/IClass';

const initialState: IBusinessClassForm = {
    Teacher: {
        TeacherId: 0
    },
    Class: {
        Name: '',
        StartDate: '',
        EndScheduleType: 'SpecificEndDate',
        MakeupRequired: true,
        TrackPrepayment: true,
        EndNumber: 0,
        EndDate: '',
        PaymentAmount: 0,
        PaymentType: ''
    },
    Location: {
        LocationId: 0,
        LocationType: 'Online',
        Url: ''
    },
    Room: {
        RoomId: 0
    },
    Slots: [],
    Sessions: [],
    Students: [],
    numberOf: null
};

export const businessClassFormSlice = createSlice({
    name: 'businessClassForm',
    initialState,
    reducers: {
        setClassName: (state, payload: PayloadAction<string>) => {
            state.Class.Name = payload.payload;
        },
        setClass: (state, payload: PayloadAction<IClass>) => {
            state.Class = { ...state.Class, ...payload.payload };
        },
        setNumberOf: (state, payload: PayloadAction<number | null>) => {
            state.numberOf = payload.payload;
        },
        setLocation: (state, payload: PayloadAction<IClassLocation>) => {
            state.Location = payload.payload;
        },
        setTeacher: (state, payload: PayloadAction<number | undefined>) => {
            state.Teacher.TeacherId = payload.payload;
        },
        setRoom: (state, payload: PayloadAction<number | undefined>) => {
            state.Room.RoomId = payload.payload;
        },
        clear: (state) => {
            state.Teacher = initialState.Teacher;
            state.Class = initialState.Class;
            state.Location = initialState.Location;
            state.Room = initialState.Room;
            state.Slots = initialState.Slots;
            state.Sessions = initialState.Sessions;
            state.Students = initialState.Students;
        },
    },
});

export const businessClassFormActions = businessClassFormSlice.actions;
export const businessClassFormReducer = businessClassFormSlice.reducer;