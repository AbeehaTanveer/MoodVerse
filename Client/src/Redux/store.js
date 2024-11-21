import {configureStore} from "@reduxjs/toolkit";
import todoSlice from "../Redux/reducer/reducer"

const store = configureStore({
    reducer: {
        todos: todoSlice, // "todos" key specify ki
      },

})

export default store