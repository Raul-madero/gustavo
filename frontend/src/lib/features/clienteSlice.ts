import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface Cliente {
    rfc: string,
    nombre: string,
    giro: string,
    contacto: string,
    colaborador: number
}

export const crearCliente = createAsyncThunk('cliente/crearCliente', async ({rfc, nombre, giro, contacto, colaborador}: Cliente) => {
    try {
        const res = await axios.post('http://127.0.0.0:5000/clientes', {rfc, nombre, giro, contacto, colaborador})
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
    error: null
}

export const clienteSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(crearCliente.fulfilled, (state, action) => {
                state.cliente = action.payload
                state.loading = false
                state.error = null
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