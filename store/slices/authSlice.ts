import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface User {
  id: string
  name: string
  surname: string
  email: string
  avatar: string
  wishlist: number[]
  cart: Array<{ id: number; quantity: number }>
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
}

// API əməliyyatları
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch("https://673a25baa3a36b5a62f0de6a.mockapi.io/Popular-Games")
    const users = await response.json()
    const user = users.find((u: User) => u.email === email && u.password === password)

    if (!user) {
      throw new Error("Email və ya şifrə yanlışdır")
    }

    return user
  },
)

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, surname, email, password }: { name: string; surname: string; email: string; password: string }) => {
    const response = await fetch("https://673a25baa3a36b5a62f0de6a.mockapi.io/Popular-Games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        email,
        password,
        avatar: "",
        wishlist: [],
        cart: [],
      }),
    })

    if (!response.ok) {
      throw new Error("Qeydiyyat zamanı xəta baş verdi")
    }

    return await response.json()
  },
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem("user")
      localStorage.removeItem("cart")
      localStorage.removeItem("wishlist")
    },
    loadUserFromStorage: (state) => {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        state.user = JSON.parse(savedUser)
        state.isAuthenticated = true
      }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        localStorage.setItem("user", JSON.stringify(action.payload))
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Giriş zamanı xəta baş verdi"
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        localStorage.setItem("user", JSON.stringify(action.payload))
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Qeydiyyat zamanı xəta baş verdi"
      })
  },
})

export const { logout, loadUserFromStorage, clearError } = authSlice.actions
export default authSlice.reducer
