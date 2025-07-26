import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type Language = "az" | "en" | "ru"

interface LanguageState {
  currentLanguage: Language
}

const initialState: LanguageState = {
  currentLanguage: "az",
}

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload
      localStorage.setItem("language", action.payload)
    },
    loadLanguageFromStorage: (state) => {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage) {
        state.currentLanguage = savedLanguage
      }
    },
  },
})

export const { setLanguage, loadLanguageFromStorage } = languageSlice.actions
export default languageSlice.reducer
