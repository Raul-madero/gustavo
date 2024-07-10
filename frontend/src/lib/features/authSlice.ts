import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface User {
    email: string,
    password: string
}

export const signup = createAsyncThunk('auth/signup', async ({email, password}: User, { rejectWithValue}) => {
    console.log(email)
    try {
        const res = await axios.post('http://127.0.0.0:5000/login', {email, password})
        console.log(res.data)
        return res.data
    } catch (error: any) {
        console.log(error)
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data)
        }else {
            return rejectWithValue(error.message)
        }
    }
})

const initialState = {
    user: "",
    isLoggedIn: false,
    loading: false,
    error: ""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = "",
            state.isLoggedIn = false,
            state.loading = false,
            state.error = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                console.log('Signup fullfiled', action.payload)
                state.user = action.payload
                state.isLoggedIn = true
                state.loading = false
                state.error = ""
            })
            .addCase(signup.pending, (state, action) => {
                state.loading = true
            })
            .addCase(signup.rejected, (state, action) => {
                console.log('Signup rejected', action.error)
                state.isLoggedIn = false
                state.loading = false
                state.error = action.error.message || "An error occurred. Please try again."
            })
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer