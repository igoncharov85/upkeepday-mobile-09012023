import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    loading: boolean
    countries: Array<string>
    states: Array<string>
    statesLoading: boolean
}

const initialState: AuthState = {
    loading: false,
    countries: [],
    states: [],
    statesLoading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setStatesAction: (state, action: PayloadAction<Array<string>>) => {
            console.log('action.payload', action.payload)
            state.states = action.payload
        },
        setCountriesAction: (state, action: PayloadAction<Array<string>>) => {
            state.countries = action.payload
        },
        setStatesLoading: (state, action: PayloadAction<boolean>) => {
            state.statesLoading = action.payload
        }
    },

})

// Action creators are generated for each case reducer function
export const { setAuthLoadingAction, setCountriesAction, setStatesAction, setStatesLoading } = authSlice.actions

export default authSlice.reducer