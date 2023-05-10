import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserStudent } from "../../common/types/user";

interface IUserStore {
    students: Array<IUserStudent>
}

const initialState: IUserStore = {
    students: []
}

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setStudentAction: (state, action: PayloadAction<Array<IUserStudent>>) => {
            state.students = action.payload
        },
        addStudentAction: (state, action: PayloadAction<IUserStudent>) => {
            state.students = [action.payload, ...state.students]
        },
    },
})


export const { setStudentAction, addStudentAction } = userSlice.actions
export default userSlice.reducer