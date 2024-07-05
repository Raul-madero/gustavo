import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import userSlice from "./features/userSlice";
import clienteSlice from "./features/clienteSlice";
import colaboradorSlice from "./features/colaboradorSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authSlice,
            user: userSlice,
            cliente: clienteSlice,
            colaboradores: colaboradorSlice
        },
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;