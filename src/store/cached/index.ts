import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IRegistrationRequest } from "../../common/types/auth.types"

interface AppState {
    registrationForm?: IRegistrationRequest
}

const initialState: AppState = {
    registrationForm: undefined
}

const cacheSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {

        cacheRegistrationFormAction(state, action: PayloadAction<IRegistrationRequest>) {
            state.registrationForm = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { cacheRegistrationFormAction } = cacheSlice.actions

export default cacheSlice.reducer