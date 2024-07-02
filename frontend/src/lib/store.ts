import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import userSlice from "./features/userSlice";
import clienteSlice from "./features/clienteSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authSlice,
            user: userSlice,
            cliente: clienteSlice
        },
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;