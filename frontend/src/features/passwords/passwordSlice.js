import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import passwordService from './passwordService'
const initialState = {
    passwords: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createPassword = createAsyncThunk('passwords/create',
    async (passwordData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await passwordService.createPassword(passwordData, token)
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
) 

export const getPassword = createAsyncThunk('passwords/get',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await passwordService.getPassword(token)
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
) 

export const deletePassword = createAsyncThunk('passwords/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await passwordService.deletePassword(id,token)
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
) 

export const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers: (builder)=>{
        builder
        .addCase(createPassword.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createPassword.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.passwords.push(action.payload)
        })
        .addCase(createPassword.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getPassword.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getPassword.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.passwords = action.payload
        })
        .addCase(getPassword.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deletePassword.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(deletePassword.fulfilled, (state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.passwords = state.passwords.filter((password)=>password._id != action.payload.id)
        })
        .addCase(deletePassword.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }

})

export const { reset } = passwordSlice.actions
export default passwordSlice.reducer