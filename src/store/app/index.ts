import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IToastModal } from "../../common/types/component.styles"

interface AppState {
    toasts: Array<IToastModal>
    currentScreen: string
}

const initialState: AppState = {
    toasts: [],
    currentScreen: ""
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        popToastsAction(state) {
            state.toasts.pop()
        },
        pushToastsAction(state, action: PayloadAction<IToastModal>) {
            state.toasts.push(action.payload)
        },
        setCurrentScreenAction(state, action: PayloadAction<string>) {
            state.currentScreen = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { popToastsAction, pushToastsAction, setCurrentScreenAction } = appSlice.actions

export default appSlice.reducer