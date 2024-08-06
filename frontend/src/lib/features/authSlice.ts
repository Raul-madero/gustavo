import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface User {
    email: string,
    password: string
}

const urlApi = process.env.REACT_APP_API_URL

export const signup = createAsyncThunk('auth/signup', async ({email, password}: User, { rejectWithValue}) => {
    try {
        const res = await axios.post("http://127.0.0.1:5000/login", {email, password})
        console.log(res.data)
        return res.data
    } catch (error: any) {
        return rejectWithValue(error.response.data)
    }
})

export const signout = createAsyncThunk('auth/signout', async () => {
    try {
        const res = await axios.post("http://127.0.0.1:5000/logout")
        return res.data
    } catch (error: any) {
        return error.message
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
        // logout: (state, action) => {
        //     state.user = "",
        //     state.isLoggedIn = false,
        //     state.loading = false,
        //     state.error = ""
        // }
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
            .addCase(signout.fulfilled, (state, action) => {
                console.log('Signout fullfiled', action.payload)
                state.user = ""
                state.isLoggedIn = false
                state.loading = false
                state.error = ""
            })
            .addCase(signout.pending, (state, action) => {
                state.loading = true
            })
            .addCase(signout.rejected, (state, action) => {
                console.log('Signout rejected', action.error)
                state.isLoggedIn = false
                state.loading = false
                state.error = action.error.message || "An error occurred. Please try again."
            })
    }
})

// export const { logout } = authSlice.actions

export default authSlice.reducer