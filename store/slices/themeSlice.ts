import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface ThemeState {
  mode: "light" | "dark" | "system"
  primaryColor: string
  isLoading: boolean
}

const initialState: ThemeState = {
  mode: "system",
  primaryColor: "blue",
  isLoading: false,
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.mode = action.payload
      localStorage.setItem("theme-mode", action.payload)
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload
      localStorage.setItem("theme-color", action.payload)
    },
    loadThemeFromStorage: (state) => {
      const savedMode = localStorage.getItem("theme-mode") as "light" | "dark" | "system"
      const savedColor = localStorage.getItem("theme-color")

      if (savedMode) state.mode = savedMode
      if (savedColor) state.primaryColor = savedColor
    },
    setThemeLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setThemeMode, setPrimaryColor, loadThemeFromStorage, setThemeLoading } = themeSlice.actions
export default themeSlice.reducer
