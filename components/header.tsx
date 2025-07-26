"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, X, Heart, LogOut, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import { setSearchQuery } from "@/store/slices/productsSlice"
import { logout } from "@/store/slices/authSlice"
import { AuthModal } from "@/components/auth-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/hooks/useTranslation"
import { AnimatedLink } from "@/components/animated-link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [isLogoutLoading, setIsLogoutLoading] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const { items: cartItems } = useSelector((state: RootState) => state.cart)
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist)
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { t } = useTranslation()

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("products"), href: "/products" },
    { name: t("categories"), href: "/categories" },
    { name: t("orders"), href: "/orders" },
    { name: t("help"), href: "/help" },
    { name: t("about"), href: "/about" },
    { name: t("contact"), href: "/contact" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearchLoading(true)

    setTimeout(() => {
      dispatch(setSearchQuery(searchValue))
      setIsSearchLoading(false)
    }, 500)
  }

  const handleLogout = () => {
    setIsLogoutLoading(true)

    setTimeout(() => {
      dispatch(logout())
      setIsLogoutLoading(false)
    }, 300)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <AnimatedLink href="/" className="flex items-center space-x-2 group shrink-0">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <span className="text-primary-foreground font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-xl transition-colors group-hover:text-primary hidden sm:block">
                TechStore
              </span>
            </AnimatedLink>
          </div>

          {/* Desktop Navigation - Hidden on smaller screens */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-4">
            {navigation.map((item, index) => (
              <AnimatedLink
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-all duration-300 hover:text-primary px-3 py-2 rounded-md hover:bg-accent whitespace-nowrap"
              >
                {item.name}
              </AnimatedLink>
            ))}
          </nav>

          {/* Search Bar - Hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-sm mx-4">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors group-focus-within:text-primary" />
              <Input
                placeholder={t("searchPlaceholder")}
                className="pl-10 pr-10 transition-all duration-300 focus:scale-105 w-full"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {isSearchLoading && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin" />
              )}
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Theme and Language toggles */}
            <div className="hidden sm:flex items-center space-x-1">
              <LanguageToggle />
              <ThemeToggle />
            </div>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    {isLogoutLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <User className="h-5 w-5" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user?.name} {user?.surname}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      {t("profile")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="cursor-pointer">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {t("orders")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {/* Mobile theme toggles */}
                  <div className="sm:hidden px-2 py-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t("settings")}</span>
                      <div className="flex items-center space-x-1">
                        <LanguageToggle />
                        <ThemeToggle />
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="sm:hidden" />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsAuthModalOpen(true)}>
                <User className="h-5 w-5" />
              </Button>
            )}

            {/* Wishlist */}
            <AnimatedLink href="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5 transition-colors hover:text-red-500" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </AnimatedLink>

            {/* Cart */}
            <AnimatedLink href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5 transition-colors hover:text-primary" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </AnimatedLink>

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-5 w-5 transition-transform rotate-180" />
              ) : (
                <Menu className="h-5 w-5 transition-transform" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 animate-slide-down bg-background">
            {/* Mobile Search */}
            <div className="md:hidden mb-4 px-2">
              <form onSubmit={handleSearch}>
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors group-focus-within:text-primary" />
                  <Input
                    placeholder={t("searchPlaceholder")}
                    className="pl-10"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </form>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-1 px-2">
              {navigation.map((item, index) => (
                <AnimatedLink
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-primary hover:bg-accent rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </AnimatedLink>
              ))}
            </nav>

            {/* Mobile Theme Controls for non-authenticated users */}
            {!isAuthenticated && (
              <div className="sm:hidden mt-4 px-2 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t("settings")}</span>
                  <div className="flex items-center space-x-1">
                    <LanguageToggle />
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  )
}
