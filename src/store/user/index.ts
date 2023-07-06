import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICheckinUser, IStudentResponse, IStudentsResponse, IUserStudent, IUserStudentResponse } from "../../common/types/user";

interface IUserStore {
    students: Array<IUserStudent>;
    currentStudent: Array<IUserStudentResponse>;
    checkins: Array<ICheckinUser>;
    users: Array<IStudentResponse>;
}

const initialState: IUserStore = {
    students: [],
    currentStudent: [],
    checkins: [],
    users: []
}

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setStudentAction: (state, action: PayloadAction<Array<IUserStudent>>) => {
            state.students = action.payload
        },
        setUsersAction: (state, action: PayloadAction<Array<IStudentResponse>>) => {
            state.users = action.payload
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


export const { setStudentAction, addStudentAction, setCheckinStudentAction, setCurrentStudentAction, setUsersAction } = userSlice.actions
export default userSlice.reducer