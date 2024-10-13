import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface Colaborador {
    id: number | null,
    is_admin: boolean,
    user_id: number,
}

export const fetchColaboradores = createAsyncThunk('colaborador/fetchColaboradores', async () => {
    try {
        const res = await axios.get('http://127.0.0.1:5000/colaboradores')
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const crearColaborador = createAsyncThunk('colaborador/crearColaborador', async ({ is_admin, user_id}: Colaborador) => {
    try {
        const res = await axios.post('http://127.0.0.1:5000/colaboradores', {is_admin, user_id})
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const editColaborador = createAsyncThunk('colaborador/editColaborador', async ({id, is_admin, user_id}: Colaborador & {id: number}) => {
    try {
        const res = await axios.put(`http://127.0.0.1:5000/colaboradores/${id}`, {is_admin, user_id})
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const deleteColaborador = createAsyncThunk('colaborador/deleteColaborador', async (id: number) => {
    try {
        const res = await axios.delete(`http://127.0.0.1:5000/colaboradores/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    colaborador: {
        is_admin: false,
        user_id: 0
    },
    loading: false,
    error: ""
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
                state.error = ""
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
                state.error = ""
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