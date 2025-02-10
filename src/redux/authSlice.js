import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_SERVER_URL

// Authenticate user using Telegram WebApp hash
export const authenticateUser = createAsyncThunk('auth/authenticateUser', async (telegramData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/telegram-login`, telegramData, { withCredentials: true })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Authentication failed')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('jwt') || null,
    isAuthenticated: !!localStorage.getItem('jwt'),
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('jwt')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      localStorage.setItem('jwt', action.payload.token)
    })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
