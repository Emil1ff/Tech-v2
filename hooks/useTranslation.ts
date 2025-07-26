import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { translations, type TranslationKey } from "@/lib/translations"

export function useTranslation() {
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage)

  const t = (key: TranslationKey): string => {
    return translations[currentLanguage][key] || translations.az[key] || key
  }

  return { t, currentLanguage }
}
