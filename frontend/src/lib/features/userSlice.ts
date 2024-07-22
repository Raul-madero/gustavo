import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    id: number | null,
    email: string,
    password: string,
    telefono: string
}

const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/"

export const crearUsuario = createAsyncThunk('user/crearUsuario', async ({email, password, telefono}: User) => {
    const token = sessionStorage.getItem('token')
    try {
        const res = await axios.post(`${apiUrl}usuarios`, {email, password, telefono}, {headers: {Authorization: `Bearer ${token}`}})
        return res.data
    } catch (error: any) {
        return error.response.data
    }
})

export const obtenerUsuarios = createAsyncThunk('user/obtenerUsuarios', async () => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(apiUrl + 'usuarios', {headers: {Authorization: `Bearer ${token}`}})
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const eliminarUsuario = createAsyncThunk('user/eliminarUsuario', async (id: number) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.delete(`${apiUrl}usuarios/${id}`, {headers: {Authorization: `Bearer ${token}`}})
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const getUser = createAsyncThunk('user/getUser', async (id: number) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${apiUrl}usuarios/${id}`, {headers: {Authorization: `Bearer ${token}`}})
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const getUserByEmail = createAsyncThunk('user/getUserByEmail', async (email: string) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${apiUrl}usuarios/email/${email}`, {headers: {Authorization: `Bearer ${token}`}})
        return res.data
    } catch (error) {
        console.log(error)
    }

export const editUser = createAsyncThunk('user/editUser', async ({id, email, password, telefono}: User) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.put(`${apiUrl}usuarios/${id}`, {email, password, telefono}, {headers: {Authorization: `Bearer ${token}`}})
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
