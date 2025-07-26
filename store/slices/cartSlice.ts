import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

const initialState: CartState = {
  items: [],
  total: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }

      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

      // localStorage-ə yaddaşda saxla
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      if (user.id) {
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(state.items))
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

      const user = JSON.parse(localStorage.getItem("user") || "{}")
      if (user.id) {
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(state.items))
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity)
      }
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

      const user = JSON.parse(localStorage.getItem("user") || "{}")
      if (user.id) {
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(state.items))
      }
    },
    loadCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0

      const user = JSON.parse(localStorage.getItem("user") || "{}")
      if (user.id) {
        localStorage.removeItem(`cart_${user.id}`)
      }
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, loadCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
