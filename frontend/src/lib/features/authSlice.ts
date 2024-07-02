import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface User {
    email: string,
    password: string
}

export const signup = createAsyncThunk('auth/signup', async ({email, password}: User) => {
    try {
        const res = await axios.post('http.//127.0.0.0.5000/login', {email, password})
        return res.data
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    user: "",
    isLoggedIn: false,
    loading: false,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = "",
            state.isLoggedIn = false,
            state.loading = false,
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload.email
                state.isLoggedIn = true
                state.loading = false
                state.error = null
            })
            .addCase(signup.pending, (state, action) => {
                state.loading = true
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoggedIn = false
                state.loading = false
                state.error = action.error.message || "An error occurred. Please try again."
            })
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer