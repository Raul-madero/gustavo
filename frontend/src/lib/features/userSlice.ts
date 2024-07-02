import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    email: string,
    password: string,
    telefono: string,
    cliente: number,
    colaborador: number
}

export const crearUsuario = createAsyncThunk('auth/crearUsuario', async ({email, password, telefono, cliente, colaborador}: User) => {
    try {
        const res = await axios.post('http://127.0.0.0:5000/usuarios', {email, password, telefono, cliente, colaborador})
        return res.data
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    usuario: {
        email: "",
        password: "",
        telefono: "",
        cliente: 0,
        colaborador: 0
    },
    loading: false,
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(crearUsuario.fulfilled, (state, action) => {
                state.usuario = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(crearUsuario.pending, (state, action) => {
                state.loading = true
            })
            .addCase(crearUsuario.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "An error occurred. Please try again."
            })
    }
})

export default userSlice.reducer
