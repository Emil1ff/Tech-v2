"use client"

import type React from "react"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadUserFromStorage } from "@/store/slices/authSlice"
import { loadCart } from "@/store/slices/cartSlice"
import { loadWishlist } from "@/store/slices/wishlistSlice"
import { loadThemeFromStorage } from "@/store/slices/themeSlice"
import { loadLanguageFromStorage } from "@/store/slices/languageSlice"
import type { AppDispatch } from "@/store/store"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    // Load theme settings
    dispatch(loadThemeFromStorage())

    // Load language settings
    dispatch(loadLanguageFromStorage())

    // Load user data
    dispatch(loadUserFromStorage())

    // Load user's cart and wishlist if logged in
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user.id) {
      const savedCart = localStorage.getItem(`cart_${user.id}`)
      const savedWishlist = localStorage.getItem(`wishlist_${user.id}`)

      if (savedCart) {
        dispatch(loadCart(JSON.parse(savedCart)))
      }

      if (savedWishlist) {
        dispatch(loadWishlist(JSON.parse(savedWishlist)))
      }
    }
  }, [dispatch])

  return <>{children}</>
}
