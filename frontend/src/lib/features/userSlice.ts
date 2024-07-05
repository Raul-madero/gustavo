import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    email: string,
    password: string,
    telefono: string
}

export const crearUsuario = createAsyncThunk('user/crearUsuario', async ({email, password, telefono}: User) => {
    try {
        const res = await axios.post('http://127.0.0.1:5000/usuarios', {email, password, telefono})
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const obtenerUsuarios = createAsyncThunk('user/obtenerUsuarios', async () => {
    try {
        const res = await axios.get('http://127.0.0.1:5000/usuarios')
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const eliminarUsuario = createAsyncThunk('user/eliminarUsuario', async (id: number) => {
    try {
        const res = await axios.delete(`http://127.0.0.1:5000/usuarios/${id}`)
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
    error: ""
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
                state.error = ""
            })
            .addCase(crearUsuario.pending, (state, action) => {
                state.loading = true
            })
            .addCase(crearUsuario.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "An error occurred. Please try again."
            })
            .addCase(obtenerUsuarios.fulfilled, (state, action) => {
                state.usuario = action.payload
                state.loading = false
                state.error = ""
            })
            .addCase(obtenerUsuarios.pending, (state, action) => {
                state.loading = true
            })
            .addCase(obtenerUsuarios.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "An error occurred. Please try again."
            })
            .addCase(eliminarUsuario.fulfilled, (state, action) => {
                state.usuario = action.payload
                state.loading = false
                state.error = ""
            })
            .addCase(eliminarUsuario.pending, (state, action) => {
                state.loading = true
            })
            .addCase(eliminarUsuario.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "An error occurred. Please try again."
            })
    }
})

export default userSlice.reducer
