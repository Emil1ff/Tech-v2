import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface User {
  id: string | number
  name: string
  surname?: string
  email: string
  avatar?: string
  wishlist?: number[]
  cart?: Array<{ id: number; quantity: number }>
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

// Mock API əməliyyatları
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation - in real app, this would be API call
    if (email && password) {
      const mockUser: User = {
        id: Date.now(),
        name: email.split("@")[0],
        email,
        avatar: "/placeholder.svg?height=40&width=40&text=User",
        wishlist: [],
        cart: [],
      }
      return mockUser
    } else {
      throw new Error("Email və ya şifrə yanlışdır")
    }
  },
)

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({
    name,
    surname,
    email,
    password,
  }: {
    name: string
    surname: string
    email: string
    password: string
  }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const mockUser: User = {
      id: Date.now(),
      name,
      surname,
      email,
      avatar: "/placeholder.svg?height=40&width=40&text=" + name.charAt(0),
      wishlist: [],
      cart: [],
    }

    return mockUser
  },
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.error = null
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("user")
        localStorage.removeItem("isAuthenticated")
        localStorage.removeItem("cart")
        localStorage.removeItem("wishlist")
      }
    },
    loadUserFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const savedUser = localStorage.getItem("user")
        const isAuthenticated = localStorage.getItem("isAuthenticated")
        if (savedUser && isAuthenticated === "true") {
          state.user = JSON.parse(savedUser)
          state.isAuthenticated = true
        }
      }
    },
    clearError: (state) => {
      state.error = null
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        // Update localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(state.user))
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(action.payload))
          localStorage.setItem("isAuthenticated", "true")
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Giriş zamanı xəta baş verdi"
        state.isAuthenticated = false
        state.user = null
      })
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(action.payload))
          localStorage.setItem("isAuthenticated", "true")
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Qeydiyyat zamanı xəta baş verdi"
        state.isAuthenticated = false
        state.user = null
      })
  },
})

export const { login, logout, loadUserFromStorage, clearError, updateUser } = authSlice.actions
export default authSlice.reducer
