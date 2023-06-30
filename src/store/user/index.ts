import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICheckinUser, IUserStudent, IUserStudentResponse } from "../../common/types/user";

interface IUserStore {
    students: Array<IUserStudent>;
    currentStudent: Array<IUserStudentResponse>;
    checkins: Array<ICheckinUser>;
}

const initialState: IUserStore = {
    students: [],
    currentStudent: [],
    checkins: [],
}

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setStudentAction: (state, action: PayloadAction<Array<IUserStudent>>) => {
            state.students = action.payload
        },
        setCurrentStudentAction: (state, action: PayloadAction<Array<IUserStudentResponse>>) => {
            state.currentStudent = action.payload
        },
        setCheckinStudentAction: (state, action: PayloadAction<Array<ICheckinUser>>) => {
            state.checkins = action.payload
        },
        addStudentAction: (state, action: PayloadAction<IUserStudent>) => {
            state.students = [action.payload, ...state.students]
        },
    },
})


export const { setStudentAction, addStudentAction, setCheckinStudentAction, setCurrentStudentAction } = userSlice.actions
export default userSlice.reducer