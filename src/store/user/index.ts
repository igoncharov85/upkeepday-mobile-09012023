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
        setStudent: (state, action: PayloadAction<Array<IUserStudent>>) => {
            state.students = action.payload
        },
    },
})


export const { setStudent } = userSlice.actions
export default userSlice.reducer