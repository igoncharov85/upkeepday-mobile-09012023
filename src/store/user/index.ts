import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICheckinUser, IStudentByIdResponse, IStudentResponse, IStudentsResponse, IUserStudent, IUserStudentResponse } from "../../common/types/user";

interface IUserStore {
    students: Array<IUserStudent>;
    currentStudent: Array<IUserStudentResponse>;
    checkins: Array<ICheckinUser>;
    users: Array<IStudentResponse>;
    studentList: Array<IStudentByIdResponse>;
}

const initialState: IUserStore = {
    students: [],
    currentStudent: [],
    checkins: [],
    users: [],
    studentList: []

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
        setStudentListAction: (state, action: PayloadAction<Array<IStudentByIdResponse>>) => {
            state.studentList = action.payload
        }
    },
})


export const { setStudentAction, addStudentAction, setCheckinStudentAction, setCurrentStudentAction, setUsersAction, setStudentListAction } = userSlice.actions
export default userSlice.reducer