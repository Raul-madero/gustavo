import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface Cliente {
    rfc: string,
    nombre: string,
    giro: string,
    contacto: string,
    colaborador_id: number
}

export const getClientes = createAsyncThunk('cliente/getClientes', async () => {
    try {
        const res = await axios.get('http://127.0.0.1:5000/clientes')
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const getClienteByName = createAsyncThunk('cliente/getClienteByName', async (nombre: string) => {
    try {
        const res = await axios.get(`http://127.0.0.1:5000/clientes/${nombre}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const crearCliente = createAsyncThunk('cliente/crearCliente', async ({rfc, nombre, giro, contacto, colaborador_id}: Cliente) => {
    const token = sessionStorage.getItem('token')
    try {
        const res = await axios.post('http://127.0.0.1:5000/clientes', {rfc, nombre, giro, contacto, colaborador_id}, {headers: {Authorization: `Bearer ${token}`}})
        return res.data
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    cliente: {
        rfc: "",
        nombre: "",
        giro: "",
        contacto: "",
        colaborador: 0
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
    }
})

export default clienteSlice.reducer