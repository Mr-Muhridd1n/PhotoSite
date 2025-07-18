import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: 0,
  },
  reducers: {
    increment: (state, action) => {
      state.counter += Number(action.payload);
    },
    decrement: (state, action) => {
      state.counter -= Number(action.payload);
    },
    incrementByAmaund: (state, action) => {
      state.counter += action.payload;
    },
  },
});

// export const increment = counterSlice.actions.increment;
// export const decrement = counterSlice.actions.decrement;
export const { increment, decrement, incrementByAmaund } = counterSlice.actions;
export default counterSlice.reducer;
