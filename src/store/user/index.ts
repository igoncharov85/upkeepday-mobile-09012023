import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICheckinUser, IUserStudent } from "../../common/types/user";

interface IUserStore {
    students: Array<IUserStudent>;
    checkins: Array<ICheckinUser>;
}

const initialState: IUserStore = {
    students: [],
    checkins: []
}

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setStudentAction: (state, action: PayloadAction<Array<IUserStudent>>) => {
            state.students = action.payload
        },
        setCheckinStudentAction: (state, action: PayloadAction<Array<ICheckinUser>>) => {
            state.checkins = action.payload
        },
        addStudentAction: (state, action: PayloadAction<IUserStudent>) => {
            state.students = [action.payload, ...state.students]
        },
    },
})


export const { setStudentAction, addStudentAction, setCheckinStudentAction } = userSlice.actions
export default userSlice.reducer