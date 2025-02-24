import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0
  },
  reducers: {
    increaseCount: (state) => {
      state.count += 1
    },
    decreaseCount: (state) => {
      state.count -= 1
    }
  }
})

// Action creators are generated for each case reducer function
export const { increaseCount, decreaseCount } = counterSlice.actions

export default counterSlice.reducer
