import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface Cliente {
    id: number | null,
    rfc: string,
    nombre: string,
    user_id: number,
    colaborador_id: number,
}

const dbUrl = 'http://localhost:5000'

export const getClientes = createAsyncThunk('cliente/getClientes', async () => {
    try {
        const res = await axios.get(`${dbUrl}/clientes`)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const getClienteByName = createAsyncThunk('cliente/getClienteByName', async (nombre: string) => {
    try {
        const res = await axios.get(`${dbUrl}/clientes/${nombre}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const crearCliente = createAsyncThunk('cliente/crearCliente', async ({rfc, nombre, user_id, colaborador_id}: Cliente) => {
    const token = sessionStorage.getItem('token')
    try {
        const res = await axios.post(`${dbUrl}/clientes`, {rfc, nombre, user_id, colaborador_id}, {headers: {Authorization: `Bearer ${token}`}})
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const eliminarCliente = createAsyncThunk('cliente/eliminarCliente', async (id: number) => {
    const token = sessionStorage.getItem('token')
    try {
        const res = await axios.delete(`${dbUrl}/clientes/${id}`, {headers: {Authorization: `Bearer ${token}`}})
        return res.data
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    cliente: {
        rfc: "",
        nombre: "",
        user_id: 0,
        colaborador_id: 0
    },
    loading: false,
    error: "" 
}

export const clienteSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getClientes.fulfilled, (state, action) => {
                state.cliente = action.payload
                state.loading = false
                state.error = ""
            })
            .addCase(getClientes.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getClientes.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "An error occurred. Please try again."
            })

            .addCase(crearCliente.fulfilled, (state, action) => {
                state.cliente = action.payload
                state.loading = false
                state.error = "null"
            })
            .addCase(crearCliente.pending, (state, action) => {
                state.loading = true
            })
            .addCase(crearCliente.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "An error occurred. Please try again."
            })
            .addCase(eliminarCliente.fulfilled, (state, action) => {
                state.cliente = action.payload
                state.loading = false
                state.error = "null"
            })
            .addCase(eliminarCliente.pending, (state, action) => {
                state.loading = true
            })
            .addCase(eliminarCliente.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "An error occurred. Please try again."
            })
            
    }
})

export default clienteSlice.reducer