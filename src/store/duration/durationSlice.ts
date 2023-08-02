import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const durationSlice = createSlice({
  name: 'duration',
  initialState: ['00:30', '00:45', '01:00'],
  reducers: {
    setDuration: (state, { payload }: PayloadAction<string[]>) => payload,
    clearDuration: () => ['00:30', '00:45', '01:00']
  }
})
export const { reducer:
  durationReducer, actions: durationAction
} = durationSlice
