"use client"

import { Moon, Sun, Monitor, Palette, Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { setThemeMode, setPrimaryColor, setThemeLoading } from "@/store/slices/themeSlice"
import type { AppDispatch, RootState } from "@/store/store"
import { useTheme } from "next-themes"
import { useEffect } from "react"
import { useTranslation } from "@/hooks/useTranslation"

const colors = [
  { name: "Blue", value: "blue", class: "bg-blue-500 hover:bg-blue-600" },
  { name: "Green", value: "green", class: "bg-green-500 hover:bg-green-600" },
  { name: "Red", value: "red", class: "bg-red-500 hover:bg-red-600" },
  { name: "Purple", value: "purple", class: "bg-purple-500 hover:bg-purple-600" },
  { name: "Orange", value: "orange", class: "bg-orange-500 hover:bg-orange-600" },
  { name: "Pink", value: "pink", class: "bg-pink-500 hover:bg-pink-600" },
]

export function ThemeToggle() {
  const dispatch = useDispatch<AppDispatch>()
  const { mode, primaryColor, isLoading } = useSelector((state: RootState) => state.theme)
  const { setTheme, theme } = useTheme()
  const { t } = useTranslation()

  useEffect(() => {
    // Apply theme mode
    if (mode !== theme) {
      setTheme(mode)
    }

    // Apply color theme
    const root = document.documentElement
    root.setAttribute("data-color", primaryColor)

    // Update CSS custom properties for better dark mode support
    const colorMap = {
      blue: { h: 221, s: 83, l: 53 },
      green: { h: 142, s: 76, l: 36 },
      red: { h: 0, s: 84, l: 60 },
      purple: { h: 262, s: 83, l: 58 },
      orange: { h: 25, s: 95, l: 53 },
      pink: { h: 330, s: 81, l: 60 },
    }

    const color = colorMap[primaryColor as keyof typeof colorMap] || colorMap.blue
    root.style.setProperty("--primary", `${color.h} ${color.s}% ${color.l}%`)
    root.style.setProperty("--ring", `${color.h} ${color.s}% ${color.l}%`)
  }, [mode, primaryColor, setTheme, theme])

  const handleThemeChange = (newMode: "light" | "dark" | "system") => {
    dispatch(setThemeLoading(true))

    setTimeout(() => {
      dispatch(setThemeMode(newMode))
      dispatch(setThemeLoading(false))
    }, 300)
  }

  const handleColorChange = (color: string) => {
    dispatch(setThemeLoading(true))

    setTimeout(() => {
      dispatch(setPrimaryColor(color))
      dispatch(setThemeLoading(false))
    }, 200)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {isLoading ? (
            <Loader2 className="h-[1.2rem] w-[1.2rem] animate-spin" />
          ) : (
            <>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
            </>
          )}
          <span className="sr-only">Tema dəyiş</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => handleThemeChange("light")} className="cursor-pointer">
          <Sun className="mr-2 h-4 w-4" />
          İşıqlı tema
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")} className="cursor-pointer">
          <Moon className="mr-2 h-4 w-4" />
          Qaranlıq tema
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")} className="cursor-pointer">
          <Monitor className="mr-2 h-4 w-4" />
          Sistem
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="px-2 py-1">
          <div className="flex items-center mb-2">
            <Palette className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Rəng seç</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorChange(color.value)}
                className={`w-6 h-6 rounded-full transition-all duration-200 hover:scale-110 ${color.class} ${
                  primaryColor === color.value
                    ? "ring-2 ring-offset-2 ring-offset-background ring-foreground scale-110"
                    : ""
                }`}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
