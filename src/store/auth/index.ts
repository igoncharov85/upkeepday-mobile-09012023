import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    loading: boolean

}

const initialState: AuthState = {
    loading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
    },

})

// Action creators are generated for each case reducer function
export const { setAuthLoadingAction } = authSlice.actions

export default authSlice.reducer