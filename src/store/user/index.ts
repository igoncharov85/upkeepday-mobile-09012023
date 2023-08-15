import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICheckinUser, IPaymentsTableResponse, IStudentByIdResponse, IStudentResponse, IStudentsResponse, IUserStudent, IUserStudentResponse } from "../../common/types/user";
import moment from "moment";

interface IUserStore {
    students: Array<IUserStudent>;
    currentStudent: Array<IUserStudentResponse>;
    checkins: Array<ICheckinUser>;
    users: Array<IStudentResponse>;
    studentList: Array<IStudentByIdResponse>;
    loading: boolean;
    payments: IPaymentsTableResponse
}

const initialState: IUserStore = {
    students: [],
    currentStudent: [],
    checkins: [],
    users: [],
    studentList: [],
    loading: false,
    payments: {} as any
}

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setStudentLoading: (state, action: PayloadAction<boolean>) => {
            const time = Date.now();
            // console.log('\n----loading----\n', action.payload, ' - loading status\n', moment(time).format('HH:mm:ss.SSS'), ' - time set loading')
            state.loading = action.payload
        },
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
        },
        setStudentPayments(state, action: PayloadAction<IPaymentsTableResponse>) {
            state.payments = action.payload
        }
    },
})


export const { 
    setStudentLoading, setStudentAction, addStudentAction, 
    setCheckinStudentAction, setCurrentStudentAction, setUsersAction, 
    setStudentListAction, setStudentPayments
} = userSlice.actions
export default userSlice.reducer