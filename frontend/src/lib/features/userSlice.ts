import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    id: number | null,
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    verificado: boolean
}

const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/"

export const crearUsuario = createAsyncThunk('user/crearUsuario', async ({nombre, apellido, email, password, verificado}: User) => {
    const token = sessionStorage.getItem('token')
    try {
        const res = await axios.post(`${apiUrl}usuarios`, {nombre, apellido, email, password, verificado }
            // {headers: {Authorization: `Bearer ${token}`}}
        )
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

export const getUser = createAsyncThunk('user/getUser', async (id: number, {rejectWithValue}) => {
    const token = localStorage.getItem('token')
    console.log(id)
    try {
        const res = await axios.get(`${apiUrl}usuarios/${id}`)
        // , {headers: {Authorization: `Bearer ${token}`}}
        console.log(res.data)
        return res.data
    } catch (error: any) {
        return rejectWithValue(error.response.data)
    }
})

export const getUserByEmail = createAsyncThunk('user/getUserByEmail', async (email: string, {rejectWithValue}) => {
    // const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${apiUrl}usuarios/${email}`)
        return res.data
    } catch (error: any) {
        return rejectWithValue(error.response.data)
    }
})

export const editUser = createAsyncThunk('user/editUser', async ({id,nombre, apellido, email, password, verificado}: User, {rejectWithValue}) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.put(`${apiUrl}usuarios/${id}`, {nombre, apellido,email, password, verificado}, {headers: {Authorization: `Bearer ${token}`}})
        return res.data
    } catch (error: any) {
        return rejectWithValue(error.response.data)
    }
})

const initialState = {
    usuario: {
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        verificado: false
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
            .addCase(getUser.fulfilled, (state, action) => {
                state.usuario = action.payload
                state.loading = false
                state.error = ""
            })
            .addCase(getUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "An error occurred. Please try again."
            })
            .addCase(getUserByEmail.fulfilled, (state, action) => {
                state.usuario = action.payload
                state.loading = false
                state.error = ""
            })
            .addCase(getUserByEmail.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getUserByEmail.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "An error occurred. Please try again."
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.usuario = action.payload
                state.loading = false
                state.error = ""
            })
            .addCase(editUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(editUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "An error occurred. Please try again."
            })
    }
})

export default userSlice.reducer
