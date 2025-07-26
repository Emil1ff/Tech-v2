import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface WishlistState {
  items: number[]
}

const initialState: WishlistState = {
  items: [],
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<number>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload)

        const user = JSON.parse(localStorage.getItem("user") || "{}")
        if (user.id) {
          localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(state.items))
        }
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((id) => id !== action.payload)

      const user = JSON.parse(localStorage.getItem("user") || "{}")
      if (user.id) {
        localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(state.items))
      }
    },
    loadWishlist: (state, action: PayloadAction<number[]>) => {
      state.items = action.payload
    },
    clearWishlist: (state) => {
      state.items = []

      const user = JSON.parse(localStorage.getItem("user") || "{}")
      if (user.id) {
        localStorage.removeItem(`wishlist_${user.id}`)
      }
    },
  },
})

export const { addToWishlist, removeFromWishlist, loadWishlist, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
