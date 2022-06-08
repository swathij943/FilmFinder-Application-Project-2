import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import movieReducer from "./Slices/MovieSlice";
import userReducer from "./Slices/UserSlice";

export const store = configureStore({
    reducer: {
        movie: movieReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;