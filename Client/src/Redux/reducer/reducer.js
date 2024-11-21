import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,

  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action) => {
      return state.filter((_, idx) => idx !== action.payload);
    },
    update: (state, action) => {
      console.log("Payload recieved ",action.payload)
      const { index,newValue } = action.payload; // index & new value from payload
  state[index] = newValue; 

    },
  },
});

export const { addTodo, deleteTodo ,update} = todoSlice.actions;
export default todoSlice.reducer;
