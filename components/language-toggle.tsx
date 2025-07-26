"use client"

import { Globe } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { setLanguage } from "@/store/slices/languageSlice"
import type { AppDispatch, RootState } from "@/store/store"
import type { Language } from "@/store/slices/languageSlice"

const languages = [
  { code: "az" as Language, name: "Azərbaycan", flag: "🇦🇿" },
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "ru" as Language, name: "Русский", flag: "🇷🇺" },
]

export function LanguageToggle() {
  const dispatch = useDispatch<AppDispatch>()
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage)

  const handleLanguageChange = (language: Language) => {
    dispatch(setLanguage(language))
  }

  const currentLang = languages.find((lang) => lang.code === currentLanguage)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="animate-bounce-subtle">
          <Globe className="h-[1.2rem] w-[1.2rem] transition-transform hover:scale-110" />
          <span className="sr-only">Dil seçin</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-slide-down">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`transition-all hover:scale-105 ${
              currentLanguage === language.code ? "bg-primary/10 text-primary" : ""
            }`}
          >
            <span className="mr-2 text-lg">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
