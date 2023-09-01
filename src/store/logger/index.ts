import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ILog, IType } from "../../components/UI/logger/entity/ILogger";

interface AppState {
    logs: ILog[],
    isVisible: boolean;
};

const initialState: AppState = {
    logs: [],
    isVisible: false,
};

const loggerSlice = createSlice({
    name: 'logger',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<{ type: IType, name: string, message: any }>) => {
            const { type, name, message } = action.payload;
            state.logs.unshift({ type, name, message: JSON.stringify(message, null, ' '), id: Date.now().toString() });
        },
        setIsVisible: (state, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload;
        },
        clear: (state) => {
            console.log(122212212212);
            state.logs = initialState.logs;
            state.isVisible = initialState.isVisible;
        },
    }
});

export const loggerActions = loggerSlice.actions;
export default loggerSlice.reducer;