import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    loading: boolean
    countries: Array<string>
    states: Array<string>
    statesLoading: boolean
    isAuth: boolean;
    user: IUser | null;
};

export interface IUser {
    FirstName: string;
    LastName: string;
    Phone: string;
    AddressLine1: string;
    City: string;
    State: string;
    PostalCode: string;
    Country: string;
};

const initialState: AuthState = {
    loading: false,
    countries: [],
    states: [],
    statesLoading: false,
    isAuth: false,
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setStatesAction: (state, action: PayloadAction<Array<string>>) => {
            state.states = action.payload
        },
        setCountriesAction: (state, action: PayloadAction<Array<string>>) => {
            state.countries = action.payload
        },
        setStatesLoading: (state, action: PayloadAction<boolean>) => {
            state.statesLoading = action.payload
        },
        setIsAuthAction: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
        setUserAction: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        },
    },

})

export const { setAuthLoadingAction, setCountriesAction, setStatesAction, setStatesLoading, setIsAuthAction, setUserAction } = authSlice.actions

export default authSlice.reducer