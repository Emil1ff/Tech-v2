import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import productsSlice from "./slices/productsSlice"
import cartSlice from "./slices/cartSlice"
import wishlistSlice from "./slices/wishlistSlice"
import themeSlice from "./slices/themeSlice"
import languageSlice from "./slices/languageSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    theme: themeSlice,
    language: languageSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
