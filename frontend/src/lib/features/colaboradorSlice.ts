import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface Colaborador {
    nombre: string,
    apellido: string,
    is_admin: boolean
}

export const fetchColaboradores = createAsyncThunk('colaborador/fetchColaboradores', async () => {
    try {
        const res = await axios.get('http://127.0.0.1:5000/colaboradores')
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const crearColaborador = createAsyncThunk('colaborador/crearColaborador', async ({nombre, apellido, is_admin}: Colaborador) => {
    try {
        const res = await axios.post('http://127.0.0.1:5000/colaboradores', {nombre, apellido, is_admin})
        return res.data
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    colaborador: {
        nombre: '',
        apellido: '',
        is_admin: false
    },
    loading: false,
    error: null
}

export const colaboradorSlice = createSlice({
    name: 'colaborador',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(crearColaborador.fulfilled, (state, action) => {
                state.colaborador = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(crearColaborador.pending, (state, action) => {
                state.loading = true
            })
            .addCase(crearColaborador.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "An error occurred. Please try again."
            })
            .addCase(fetchColaboradores.fulfilled, (state, action) => {
                state.colaborador = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchColaboradores.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchColaboradores.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "An error occurred. Please try again."
            })
    }
})

export default colaboradorSlice.reducer